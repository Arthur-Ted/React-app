const express = require('express');
const jwt = require('jsonwebtoken');
const Log = require('../models/Log');
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

router.post('/', auth, async (req, res) => {
  const { message } = req.body;
  const log = new Log({ userId: req.userId, message });
  await log.save();
  res.json(log);
});

router.get('/', auth, async (req, res) => {
  const logs = await Log.find({ userId: req.userId }).sort({ timestamp: -1 }).limit(100);
  res.json(logs);
});

module.exports = router;
