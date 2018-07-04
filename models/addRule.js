const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for AdUnits
let ruleSchema = new Schema({
category: String,
  description: String,
});

module.exports = mongoose.model('AddRule', ruleSchema);