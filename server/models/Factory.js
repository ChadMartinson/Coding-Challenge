const mongoose = require('mongoose');

const FactorySchema = mongoose.Schema({
  name: String,
  upper: Number,
  lower: Number,
  children: [Number]
});

FactorySchema.set('toJSON', { getters: true });


module.exports = mongoose.model('Factory', FactorySchema);
