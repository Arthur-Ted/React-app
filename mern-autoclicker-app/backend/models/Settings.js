const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  targetUrl: String,
  intervalHours: Number
});

module.exports = mongoose.model('Settings', SettingsSchema);
