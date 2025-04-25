const express = require('express');
const multer = require('multer');
const Checkup = require('../models/Checkup');
// const Checkup = require('../models/Dentist');
const auth = require('../middleware/auth');
const Dentist = require('../models/Dentist');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

router.post('/', auth('user'), async (req, res) => {
  const { dentistId } = req.body;
  const checkup = new Checkup({
    userId: req.user.id,
    dentistId,
    images: [],
    notes: [],
  });
  await checkup.save();
  res.json(checkup);
});

router.get('/user', auth('user'), async (req, res) => {
  const checkups = await Checkup.find({ userId: req.user.id }).populate('dentistId');
  res.json(checkups);
});

router.get('/dentist', auth('dentist'), async (req, res) => {
  const checkups = await Checkup.find({ dentistId: req.user.id }).populate('userId');
  res.json(checkups);
});

router.get('/dentists', auth('user'), async (req, res) => {
  const checkups = await Dentist.find({ })
  // console.log(checkups)
  res.json(checkups);
});

router.post('/:checkupId/upload', auth('dentist'), upload.array('images'), async (req, res) => {
  const { notes } = req.body;
  const imagePaths = req.files.map(file => file.path);
  const parsedNotes = Array.isArray(notes) ? notes : [notes];

  const checkup = await Checkup.findById(req.params.checkupId);
  if (!checkup) return res.status(404).json({ message: 'Checkup not found' });

  checkup.images.push(...imagePaths);
  checkup.notes.push(...parsedNotes);
  await checkup.save();

  res.json(checkup);
});

module.exports = router;
