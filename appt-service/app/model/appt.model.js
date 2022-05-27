const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const apptSchema = mongoose.Schema({
  "appointmentId" : {
    type : String, //id
    required: true,
    default: () => nanoid(7),
    index: { unique: true }
  },
  "patientEmail" : String, 
  "doctorEmail" :  String,
  "appointmentDate" : String,
  "startTime" : String,
  "scheduleId" : String,
  "appointmentStatus" : {
      type: String,
      enum : ['BOOKED', 'CANCELED'],
      default: 'BOOKED' 
  },
  "patientQuery" : String,
  "endTime" : String,
  "specialization" : String,
  "bookedOn" : Date 
});

apptSchema.pre('save', function(next) {
  this.bookedOn = Date.now();
  next();
});

module.exports = mongoose.model('appointment', apptSchema);
