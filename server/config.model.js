const mongoose = require('mongoose');

const { Schema } = mongoose;

const ConfigSchema = new Schema({
  shop: {
    type: String,
    required: true,
    index: { unique: true },
  },
  config: {
    type: Schema.Types.Mixed,
  },
  created: {
    type: Date,
  },
});

const Config = mongoose.model('Config', ConfigSchema);

module.exports = Config;