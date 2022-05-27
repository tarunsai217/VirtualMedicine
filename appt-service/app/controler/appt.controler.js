const Appt = require('../model/appt.model');

exports.createAppt = (req, res) => {
  if(!req.body) {
    return res.status(400).send({msg: "Bad Request"});
  }

  const appt = new Appt({
    patientEmail: req.body.patientEmail,
    doctorEmail: req.body.doctorEmail,
    appointmentDate: req.body.appointmentDate,
    startTime : req.body.startTime,
    endTime : req.body.endTime,
    scheduleId: req.body.scheduleId,
    specialization: req.body.specialization
  })

  appt.save().then(data => {
    res.status(201).send(data);
  }).catch(err => {
    res.send(500).send({
      msg: "Error while creating a new record"
    })
  })
}

exports.getApptById = (req, res) => {
  Appt.find({appointmentId :req.params.id}, (err, response) => {
    if (err) throw err;
    res.status(200).send(response);
  });
}

exports.getApptByPatientEmail = (req, res) => {
  Appt.find({patientEmail: req.params.patientEmail}, (err, response) => {
    if (err) throw err;
    res.status(200).send(response);
  });
}

exports.getApptByDoctorEmail = (req, res) => {
  Appt.find({doctorEmail: req.params.doctorEmail}, (err, response) => {
    if (err) throw err;
    res.status(200).send(response);
  });
}

exports.updateApptByID = (req, res) => {
  body = {appointmentStatus: req.body.appointmentStatus};
  Appt.updateOne({appointmentId :req.params.id}, body, (err, response) => {
    if (err) throw err;
    res.status(201).send({msg: "Record Updated Successfully"});
  })
}

exports.updateApptBySchduleID = (req, res) => {
  body = {appointmentStatus: req.body.appointmentStatus};
  Appt.updateOne({scheduleId :req.params.id}, body, (err, response) => {
    if (err) throw err;
    res.status(201).send({msg: "Record Updated Successfully"});
  })
}