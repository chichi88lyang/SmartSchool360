const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const File = require('../models/File');
const fs = require('fs');
const path = require('path');
const auth = require('../middleware/auth');

// Upload
router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    const file = new File({
      originalName: req.file.originalname,
      filePath: req.file.path,
      category: req.body.category,
      uploadedBy: req.user.id,
    });
    await file.save();
    res.status(201).json({ message: "File uploaded", file });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all files
router.get('/', auth, async (req, res) => {
  const files = await File.find().populate('uploadedBy', 'name email');
  res.json(files);
});

// Download file
router.get('/:id/download', auth, async (req, res) => {
  const file = await File.findById(req.params.id);
  if (!file) return res.status(404).send("Not found");

  res.download(path.resolve(file.filePath), file.originalName);
});

// Delete file
router.delete('/:id', auth, async (req, res) => {
  const file = await File.findById(req.params.id);
  if (!file) return res.status(404).send("Not found");

  fs.unlinkSync(file.filePath);
  await file.deleteOne();
  res.json({ message: "Deleted" });
});

module.exports = router;
