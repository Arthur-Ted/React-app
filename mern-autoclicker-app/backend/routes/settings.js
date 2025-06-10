const express = require('express');
const jwt = require('jsonwebtoken');
const Settings = require('../models/Settings');
const router = express.Router();

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.sendStatus(403);
  }
};

router.get('/', auth, async (req, res) => {
  const settings = await Settings.findOne({ userId: req.userId });
  res.json(settings);
});

router.post('/', auth, async (req, res) => {
  const { targetUrl, intervalHours } = req.body;
  const existing = await Settings.findOne({ userId: req.userId });
  if (existing) {
    existing.targetUrl = targetUrl;
    existing.intervalHours = intervalHours;
    await existing.save();
    res.json(existing);
  } else {
    const settings = new Settings({ userId: req.userId, targetUrl, intervalHours });
    await settings.save();
    res.json(settings);
  }
});

module.exports = router;
