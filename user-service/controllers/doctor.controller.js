const { Doctor } = require("../models/doctor.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// This function is used to fetch the data using email id from Doctor collections...
exports.findByEmailId = (req, res) => {
  const emailId = req.params.emailId;
  Doctor.find({ email: emailId })
    .then((users) => {
      if (users.length > 0) {
        console.log(users[0]);
        res.send(users[0]);
      } else {
        res.send([]);
      }
    })
    .catch((err) => {
      res.status(500).send({
        msg: "error occured while fetching users..",
      });
    });
};

// This function is used to fetch the data using email id from Doctor collections...
exports.updateByEmailId = async (req, res) => {
  const doctorData = req.body;
  try {
    const email = doctorData.email;
    const result = await Doctor.updateOne({ email }, { $set: doctorData });
    res.send(result);
  } catch (e) {
    res.send(`Oops, ${e}`);
  }
};

// This function will fetch all the appointments of the given doctors...
exports.getAllTheDoctorByCityAndSpecialization = (req, res) => {
  const city = req.query.city;
  const specialization = req.query.specialization;
  if (city != "" && specialization == "") {
    Doctor.find({ city })
      .then((users) => {
        console.log(users);
        if (users.length > 0) {
          res.send(users);
        } else {
          res.send([]);
        }
      })
      .catch((err) => {
        res.status(500).send({
          msg: "error occured while fetching users..",
        });
      });
  } else if (city === "" && specialization !== "") {
    Doctor.find({ specialization })
      .then((users) => {
        if (users.length > 0) {
          res.send(users);
        } else {
          res.send([]);
        }
      })
      .catch((err) => {
        res.status(500).send({
          msg: "error occured while fetching users..",
        });
      });
  } else if (city !== "" && specialization !== "") {
    Doctor.find({ city, specialization })
      .then((users) => {
        if (users.length > 0) {
          res.send(users);
        } else {
          res.send([]);
        }
      })
      .catch((err) => {
        res.status(500).send({
          msg: "error occured while fetching users..",
        });
      });
  }
};

// This function will fetch all the appointments of the given doctors...

exports.getAllTheDoctor = (req, res) => {
  Doctor.find()
    .then((users) => {
      if (users.length > 0) {
        res.send(users);
      } else {
        res.send([]);
      }
    })
    .catch((err) => {
      res.status(500).send({
        msg: "error occured while fetching users..",
      });
    });
};

exports.signup = async (req, res) => {
  console.log('signup')
  if (req.body.email.length === 0 || req.body.password.length === 0) {
    return res.status(400).send({
      msg: "Enter complete details...",
    });
  }
  const pwd = req.body.password;
  const salt = bcrypt.genSaltSync(10);
  req.body.password = bcrypt.hashSync(pwd, salt);

  let found = await Doctor.find({ email: req.body.email });
  if (found.length !== 0) {
    return res.status(400).send({
      msg: "Email already in use",
    });
  }
  const doctor = new Doctor({
    email: req.body.email,
    password: req.body.password,
  });
  doctor
    .save()
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        msg: "Error Occured while creating records.........",
      });
    });
};

exports.signin = (req, res) => {
  if (req.body.email.length === 0 || req.body.password.length === 0) {
    return res.status(400).send({
      msg: "Enter complete details...",
    });
  }

  Doctor.findOne({ email: req.body.email }, (err, users) => {
    if (err) {
      res.status(401).send({
        msg: "Invalid email or password",
      });
    }
    if (!users) {
      res.status(404).send({
        msg: "Email not found",
      });
    }
    bcrypt.compare(req.body.password, users.password, (err, result) => {
      if (result == true) {
        let jwtsecretKey = process.env.JWT_SECRET_KEY;
        let data = {
          time: new Date(),
          password: users.password,
        };
        const token = jwt.sign(data, jwtsecretKey);
        res.status(202).send({ token });
      } else {
        res.status(401).send({
          msg: "Invalid email or password",
        });
      }
    });
  });
};
