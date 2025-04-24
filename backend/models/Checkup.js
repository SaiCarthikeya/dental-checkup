const mongoose = require('mongoose');

const CheckupSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dentistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dentist' },
  images: [String],
  notes: [String],
});

module.exports = mongoose.model('Checkup', CheckupSchema);
