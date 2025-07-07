import Link from 'next/link';
import { useEffect, useState } from 'react';
import { 
  Button, 
  Typography, 
  TableContainer, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 
  Paper, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Box, 
  Grid 
} from '@mui/material';

const Home = () => {
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [statusFilter, setStatusFilter] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const query = new URLSearchParams({
          page,
          limit,
          ...(statusFilter && { status: statusFilter }),
        }).toString();
        const res = await fetch(`/api/projects?${query}`);
        if (!res.ok) {
          const { message } = await res.json();
          throw new Error(message || 'Failed to fetch projects');
        }
        const { data, totalPages } = await res.json();
        setProjects(data);
        setTotalPages(totalPages);
        setError(null); // Clear any previous errors
      } catch (error) {
        setError(error.message);
        setProjects([]); // Clear projects on error
        setTotalPages(1); // Reset total pages on error
      }
    };
    fetchProjects();
  }, [page, limit, statusFilter]);

  const confirmDelete = (id) => {
    setProjectToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/projects/${projectToDelete}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || 'Failed to delete project');
      }
      setProjects(projects.filter((project) => project._id !== projectToDelete));
      setShowDeleteModal(false);
      setProjectToDelete(null);
      setError(null); // Clear any previous errors
    } catch (error) {
      setError(error.message);
      setShowDeleteModal(false);
      setProjectToDelete(null);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>Projects</Typography>
      {error && <Typography color="error">Error: {error}</Typography>}

      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid item>
          <Link href="/new-project"><Button variant="contained" color="primary">Add Project</Button></Link>
        </Grid>
        <Grid item>
          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} label="Status">
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Not Started">Not Started</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {projects.length === 0 && !error ? (
        <Typography>No projects found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project._id}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell>
                    <Link href={`/projects/${project._id}`} legacyBehavior>
                      <Button variant="outlined" color="primary">Edit</Button>
                    </Link>
                    <Button variant="outlined" color="secondary" onClick={() => confirmDelete(project._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1} variant="outlined">Previous</Button>
        <Typography display="inline" mx={2}>Page {page} of {totalPages}</Typography>
        <Button onClick={() => setPage(page + 1)} disabled={page === totalPages} variant="outlined">Next</Button>
      </Box>

      <Dialog open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this project?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="primary">Yes</Button>
          <Button onClick={() => setShowDeleteModal(false)} color="secondary">No</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Home;