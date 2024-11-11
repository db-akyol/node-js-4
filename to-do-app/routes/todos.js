const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Görevleri Listeleme (GET)
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos); // JSON formatında görevleri gönder
  } catch (error) {
    res.status(500).json({ message: 'Görevler Getirilemedi' });
  }
});

// Görev Ekleme (POST)
router.post('/', async (req, res) => {
  const { title } = req.body;
  try {
    const newTodo = new Todo({ title });
    await newTodo.save();
    res.status(201).json(newTodo); // Yeni görevi JSON formatında gönder
  } catch (error) {
    res.status(500).json({ message: 'Görev Eklenemedi' });
  }
});

// Görev Güncelleme (PUT)
router.put('/:id', async (req, res) => {
  const { title, completed } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, completed },
      { new: true }
    );
    res.json(updatedTodo); // Güncellenen görevi JSON formatında gönder
  } catch (error) {
    res.status(500).json({ message: 'Görev Güncellenemedi' });
  }
});

// Görev Silme (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Görev Silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Görev Silinemedi' });
  }
});

module.exports = router;
