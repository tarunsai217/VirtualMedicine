const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const doctorRouter = require("./routes/doctor.route.js");
var patientRouter = require("./routes/patientRoute");
const dbConfig = require("./config/database.config");
require("dotenv").config();
const app = express();

const corsOptions = {
  origin: ["http://localhost:3003","http://localhost:3000"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

mongoose
  .connect(dbConfig.url, { useNewUrlParser: true })
  .then(() => {
    console.log("successfully connected to the database...");
  })
  .catch((err) => {
    console.log("could not Connect with DB.");
    process.exit();
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// This is for running all the doctor services...
app.use("/api/v1/user/doctor", doctorRouter);
app.use("/api/v1/user/patient", patientRouter);

app.listen(8020, () => {
  console.log("Listening on port 8020");
});

module.exports = app;
