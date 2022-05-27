module.exports = (app) => {
  const appt = require('../controler/appt.controler');
  const api = '/api/v1/appointments';

  app.post(`${api}/appointment`, appt.createAppt);
  app.get(`${api}/appointment/:id`, appt.getApptById);
  app.get(`${api}/appointment/patient/:patientEmail`, appt.getApptByPatientEmail);
  app.get(`${api}/appointment/doctor/:doctorEmail`, appt.getApptByDoctorEmail);
  app.put(`${api}/appointment/:id`, appt.updateApptByID);
  app.put(`${api}/appointment/schedule/:id`, appt.updateApptBySchduleID);
}