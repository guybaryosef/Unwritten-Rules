const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for AdUnits
let ruleSchema = new Schema({
  description: String,
  tags: [String],
  thumbsUp: Number,
  thumbsDown: Number
});
ruleSchema.index({description: 'text'});

module.exports = mongoose.model('Rule', ruleSchema);