// module.exports = (app) => {
//     const sched = require('../controller/schedule.controller');
//     const api = '/api/v1/schedules';

//     app.post(`${api}/create`, sched.createSchedule);
//     app.get(`${api}/getScheduleById/:id`, sched.getScheduleById);
//     app.get(`${api}/getScheduleByDoctorEmail/:doctorEmail`, sched.getScheduleByDoctorEmail);
//     app.put(`${api}/updateSchedule/:id`, sched.updateScheduleByID);
//   }

var express = require("express");
var router = express.Router();
const schedule = require("../controller/schedule.controller.js");

router.post("/create", schedule.createSchedule);

router.get("/getScheduleById/:id", schedule.getScheduleById);

router.get("/getScheduleByDoctorEmail/:doctorEmail", schedule.getScheduleByDoctorEmail);

router.get("/getScheduleByDoctorEmail/scheduleDate/:doctorEmail/:scheduleDate", schedule.getScheduleByDoctorEmailscheduleDate)

router.put("/updateSchedule/:id", schedule.updateScheduleByID);

module.exports = router;
