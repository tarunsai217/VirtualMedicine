const express = require('express');
const app = express();
const dbConfig = require('./config/db.config');
const { mongoose } = require('mongoose');
const cors = require('cors');

mongoose.Promise = global.Promise;

app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log('Db Connected Successfully');
}).catch(err => {
  console.log(err);
  process.exit();
})

app.get('/health', (req, res) => {
  res.status(200).send({ msg : 'Api Working !!!'})
})

require('./app/routes/appt.routes')(app);

app.use("/", (req, res, next) => {
  res.status("404").json({msg: "Not found"})
})

app.listen(8091, () => {
  console.log('Appt Server is running in port 8091');
})
