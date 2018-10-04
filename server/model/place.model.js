'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SchemaTypes = Schema.Types;

// *** Create Place Schema *** //
var Place = new Schema({
  locationName: String,
  description: String,
  latitude: Number,
  longitude: Number
});

module.exports = mongoose.model('places', Place);