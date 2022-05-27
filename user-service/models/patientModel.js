const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    specialization:String,
    mobileNo:String,
    MCI:Number,
    city:String,
    image:Buffer,
    experience:String
});

module.exports = mongoose.model("Patient", patientSchema);
