'use strict';

const mongoose = require('mongoose');

const CurrencySchema = new mongoose.Schema({
  code: Boolean,
  before: Boolean,
  description: String,
  showCents: { type: Boolean, default: false },
  fotmat: String,
  market: String,
}, {
    versionKey: false,
    timestamps: true
  });

module.exports = mongoose.model('currency', CurrencySchema);
