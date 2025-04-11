const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
  name: String,
  url: String,
  category: String,
});

module.exports = mongoose.model('Site', siteSchema);
