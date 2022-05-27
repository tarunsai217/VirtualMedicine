const Patient = require("../models/patientModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup= async(req,res)=>{
  console.log('Uphit')
    if (req.body.email.length===0 || req.body.password.length===0) {
      return res.status(400).send({
        msg: "Enter complete details...",
      });
    }
    const pwd = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(pwd, salt);
    
    let found =await Patient.find({email: req.body.email})
    if(found.length!==0){
      return res.status(400).send({
        msg: "Email already in use",
      });
    }
  const patient = new Patient({
    email: req.body.email,
    password: req.body.password,
  });
    patient
    .save()
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        msg: "Error Occured while creating records.........",
      });
    });
  
}

exports.signin=(req,res)=>{
  console.log('Inhit')
  if (req.body.email.length===0 || req.body.password.length===0) {
    return res.status(400).send({
      msg: "Enter complete details...",
    });
  }

  Patient.findOne({ email: req.body.email }, (err, users) => {
      
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
          time:new Date(),
          password: users.password,
        };
        const token = jwt.sign(data, jwtsecretKey);
        res.status(202).send({token});
      } else {
        res.status(401).send({
          msg: "Invalid email or password",
        });
      }
    });
  });
}

exports.find=async(req,res)=>{
    let found=await Patient.findOne({email:req.params.patientId})
    if(!found){
      return res.status(404).send({
        msg: "No patient found",
      });
    }
    res.status(200).send(found);
}    

exports.update=async(req,res)=>{
    let filter={email:req.body.email}
    update=req.body;
    let found = await Patient.findOneAndUpdate(filter, update, {
      new: true
    });
    res.status(200).send(found)
    
}