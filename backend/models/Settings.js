const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  targetUrl: { type: String, required: [true, 'Target URL is required'] },
  intervalHours: { type: Number, required: [true, 'Interval hours are required'] }
});

module.exports = mongoose.model('Settings', SettingsSchema);
