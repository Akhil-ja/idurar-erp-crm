
import dbConnect from '../../../lib/dbConnect';
import Project from '../../../models/Project';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const { page = 1, limit = 10, status } = req.query;
        const query = status ? { status } : {};
        const projects = await Project.find(query)
          .limit(limit * 1)
          .skip((page - 1) * limit);
        const count = await Project.countDocuments(query);
        res.status(200).json({
          success: true,
          data: projects,
          totalPages: Math.ceil(count / limit),
          currentPage: page,
        });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    case 'POST':
      try {
        const project = await Project.create(
          req.body
        );
        res.status(201).json({ success: true, data: project });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
