const express = require('express');
const router = express.Router();
const Site = require('../models/Site');

router.get('/sites', async (req, res) => {
  const sites = await Site.find();
  res.json(sites);
});

router.post('/sites', async (req, res) => {
  const { name, url, category } = req.body;
  const site = new Site({ name, url, category });
  await site.save();
  res.status(201).json(site);
});

module.exports = router;
