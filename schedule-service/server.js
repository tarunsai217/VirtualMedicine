const express = require("express");
const app = express();
const dbConfig = require("./config/db.config");
const { mongoose } = require("mongoose");
const cors = require("cors");

mongoose.Promise = global.Promise;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB Connected Successfully");
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });

// app.use('/', (req, res) => {
//   res.status(200).send({ msg : 'api Working !!!'})
// })

// require('./app/routes/schedule.routes')(app);

var scheduleRouter = require("./app/routes/schedule.routes");
// console.log(scheduleRouter);

app.use("/scheduleservice/api/v1/schedules", scheduleRouter);

// app.use("/", (req, res, next) => {
//   res.status(404).json({msg: "Not found"})
// })

app.listen(8090, () => {
  console.log("Schedule Server is running on port 8090");
});
