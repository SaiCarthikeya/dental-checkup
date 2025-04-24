const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Dentist = require('../models/Dentist');
const router = express.Router();

router.get('/', async (req, res) => {
  const dentists = await Dentist.find({}, '-password');
  res.json(dentists);
});

router.post('/register', async (req, res) => {
  try {
    const dentist = new Dentist(req.body);
    await dentist.save();
    res.json({ success: true, message: 'Dentist registered' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const dentist = await Dentist.findOne({ email });
  if (!dentist) return res.status(400).json({ message: 'Dentist not found' });

  const valid = await bcrypt.compare(password, dentist.password);
  if (!valid) return res.status(400).json({ message: 'Invalid password' });

  const token = jwt.sign({ id: dentist._id, role: 'dentist' }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res.json({ token, dentistId: dentist._id });
});

module.exports = router;
