const mongoose = require("mongoose");

const doctorschema = new mongoose.Schema({
  name: String,
  email: String,
  specialization: String,
  mobileNo: String,
  MCI: Number,
  city: String,
  image: String,
  experience: Number,
  password: String,
});

module.exports.Doctor = mongoose.model("Doctor", doctorschema);
