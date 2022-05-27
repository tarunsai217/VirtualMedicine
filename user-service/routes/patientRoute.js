var express = require('express');
var router = express.Router();
const patient = require("../controllers/patientController.js");

/* Sign in patient */
router.post("/login", patient.signin);
/* Sign up patient */
router.post("/",patient.signup);
/* Find patient */
router.get("/:patientId", patient.find);
/* Update patient profile */
router.put("/",patient.update);

module.exports = router;















// module.exports = (app) => {
//     const patient = require("../controllers/patientController.js");
  
//     app.post("api/v1/auth/patient/login",(req,res)=>{res.json({msg:'Login'})});
//     app.post("api/v1/auth/patient",patient.signup);

//     app.get("api/v1/user/patient/{patientId}", patient.find);
//     app.put("api/v1/user/patient",patient.update);
//   };
  