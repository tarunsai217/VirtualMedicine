const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const schedSchema = mongoose.Schema({
  "scheduleId" : {
    type : String, //id
    required: true,
    default: () => nanoid(7),
    index: { unique: true }
  },
  "doctorEmail" :  String,
  "scheduleDate" : String,
  "startTime" : String,
  "scheduleStatus" : {
      type: String,
      enum : ['AVAILABLE', 'NOT_AVAILABLE', 'BOOKED'],
      default: 'AVAILABLE' 
  },
  "endTime" : String,
  "specialization" : String
});

module.exports = mongoose.model('schedule', schedSchema);