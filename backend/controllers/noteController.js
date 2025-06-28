const Note = require('../models/Note');

exports.createNote = async (req, res) => {
  try {
    const note = await Note.create({ ...req.body, userId: req.user.id });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create note' });
  }
};

exports.getNotes = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const notes = await Note.find({ userId: req.user.id })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const total = await Note.countDocuments({ userId: req.user.id });

    res.json({ data: notes, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const updated = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Note not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update note' });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const deleted = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deleted) return res.status(404).json({ error: 'Note not found' });
    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete note' });
  }
};