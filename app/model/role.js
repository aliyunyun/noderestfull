'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const role = new Schema({
    name: { type: String },
    password: { type: String },
    create_at: { type: Date, defaule: Date.now },
  });

  return mongoose.module('Role', role);
};
