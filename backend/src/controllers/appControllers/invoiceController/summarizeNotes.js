const mongoose = require('mongoose');
const Model = mongoose.model('Invoice');
const { GoogleGenAI } = require('@google/genai');

const summarizeNotes = async (req, res) => {
  try {
    const { id } = req.params;

    const invoice = await Model.findById(id).exec();

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found',
      });
    }

    const allNotes = invoice.items
      .map((item) => item.notes)
      .filter(Boolean)
      .join('\n');

    if (!allNotes) {
      return res.status(200).json({
        success: true,
        result: 'No notes available to summarize.',
        message: 'No notes available',
      });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Summarize the following notes:\n${allNotes}`,
    });

    const summary = response.text;

    return res.status(200).json({
      success: true,
      result: summary,
      message: 'Notes summarized successfully',
    });
  } catch (error) {
    console.error('Error summarizing notes:', error);
    return res.status(500).json({
      success: false,
      message: 'Error summarizing notes',
      error: error.message,
    });
  }
};

module.exports = summarizeNotes;
