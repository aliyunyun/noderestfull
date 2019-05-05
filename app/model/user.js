'use strict';
module.exports = app => {

  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const usermodel = new Schema({
    mobile: { type: String, unique: true, require: true },
    realName: { type: String },
    password: { type: String },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    createAt: { type: Date, default: Date.now },
  });

  return mongoose.model('User', usermodel);
};

