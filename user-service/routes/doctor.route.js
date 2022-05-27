const doctor = require("../controllers/doctor.controller.js");
const express = require("express");
const router = express.Router();

// This route is use to get the data of doctor using Email Id...
router.get("/:emailId", doctor.findByEmailId);

router.get(
  "/city/specialization",
  doctor.getAllTheDoctorByCityAndSpecialization
);

router.get("/", doctor.getAllTheDoctor);

// This route is use to update the doctor profile
router.put("/", doctor.updateByEmailId);

// Register Doctors...
router.post("/", doctor.signup);

router.post("/login", doctor.signin);

module.exports = router;
