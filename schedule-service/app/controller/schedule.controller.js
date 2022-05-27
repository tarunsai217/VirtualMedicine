const Schedule = require("../model/schedule.model");
const luxon = require("luxon");

exports.createSchedules = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ msg: "Bad Request" });
  }

  const sched = new Schedule({
    doctorEmail: req.body.doctorEmail,
    scheduleDate: req.body.scheduleDate,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    specialization: req.body.specialization,
    scheduleStatus: req.body.scheduleStatus,
  });

  sched
    .save()
    .then((data) => {
      res.status(201).send(data);
      console.log("request hit");
    })
    .catch((err) => {
      res.send(500).send({
        msg: "Error while creating a new record",
      });
    });
};

exports.getScheduleById = (req, res) => {
  console.log("request hit");
  Schedule.find({ scheduleId: req.params.id }, (err, response) => {
    if (err) throw err;
    res.status(200).send(response);
  });
};

exports.getScheduleByDoctorEmail = (req, res) => {
  console.log("request hit");
  Schedule.find({ doctorEmail: req.params.doctorEmail }, (err, response) => {
    if (err) throw err;
    console.log(response);
    res.status(200).send(response);
  });
};

exports.getScheduleByDoctorEmailscheduleDate = (req, res) => {
  console.log("request hit");
  Schedule.find(
    {
      doctorEmail: req.params.doctorEmail,
      scheduleDate: req.params.scheduleDate,
    },
    (err, response) => {
      if (err) throw err;
      console.log(response);
      res.status(200).send(response);
    }
  );
};

exports.updateScheduleByID = (req, res) => {
  console.log("request hit");
  body = { scheduleStatus: req.body.scheduleStatus };
  Schedule.updateOne({ scheduleId: req.params.id }, body, (err, response) => {
    if (err) throw err;
    res.status(201).send({ msg: "Record Updated Successfully" });
  });
};

exports.createSchedule = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ msg: "Bad Request" });
  }
  let doctorEmail = req.body.doctorEmail;
  let scheduleDate = req.body.scheduleDate;
  let specialization = req.body.specialization;
  let scheduleStatus = req.body.scheduleStatus;
  let slotsArr = getSlots(req.body.startTime, req.body.endTime);
  console.log(slotsArr);
  for (let i = 0; i < slotsArr.length; i++) {
    const sched = new Schedule({
      doctorEmail: doctorEmail,
      scheduleDate: scheduleDate,
      startTime: slotsArr[i][0],
      endTime: slotsArr[i][1],
      specialization: specialization,
      scheduleStatus: scheduleStatus,
    });

    sched
      .save()
      .then((data) => {
        res.status(201).send(data);
        console.log("request hit");
      })
      .catch((err) => {
        res.send(500).send({
          msg: "Error while creating a new record",
        });
      });
  }
};

function getSlots(startTime, endTime) {
  let minutes = 30;
  let Duration = luxon.Duration;
  let DateTime = luxon.DateTime;
  let startHour = Number(startTime.split(":")[0]);
  let startMin = Number(startTime.split(":")[1]);
  let endHour = Number(endTime.split(":")[0]);
  let endMin = Number(endTime.split(":")[1]);
  let slotsArr = [];
  const slot = Duration.fromMillis(minutes * 60000); // 30:00 minutes

  const period = {
    startTime: DateTime.local(2020, 1, 1, startHour, startMin),
    endTime: DateTime.local(2020, 1, 1, endHour, endMin),
  };

  let slots = [];
  let slotCount = Math.trunc(
    (period.endTime.toMillis() - period.startTime.toMillis()) /
      slot.milliseconds
  );
  for (let i = 0; i < slotCount; i++) {
    slots[i] = {
      startTime: period.startTime.plus(i * slot.milliseconds),
      endTime: period.startTime.plus((i + 1) * slot.milliseconds),
    };
  }

  for (let i = 0; i < slots.length; i++) {
    let x = slots[i];
    let startHour =
      Number(x.startTime.hour) < 10 ? "0" + x.startTime.hour : x.startTime.hour;

    let startMin =
      Number(x.startTime.minute) < 10
        ? "0" + x.startTime.minute
        : x.startTime.minute;

    let startHourMin = startHour + ":" + startMin;

    let endHour =
      x.startTime.plus(slot).hour < 10
        ? "0" + x.startTime.plus(slot).hour
        : x.startTime.plus(slot).hour;

    let endMin =
      x.startTime.plus(slot).minute < 10
        ? "0" + x.startTime.plus(slot).minute
        : x.startTime.plus(slot).minute;

    let endHourMin = endHour + ":" + endMin;

    slotsArr.push([startHourMin, endHourMin]);
  }
  return slotsArr;
}
