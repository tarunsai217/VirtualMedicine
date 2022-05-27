import React, { useState } from "react";
import styles from "./Register.module.css";
import registerImg from "../../assets/register.jpg";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../env";

//const host = "https://virtualmedicine.stackroute.io";
let host = "http://localhost:8080/user/api/v1/user";

function Register() {
  const [formData, setformData] = useState({
    role: "patient",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  let navigate = useNavigate();
  // let apiBaseUrl = "https://virtualmedicine.stackroute.io";

  const formHandler = (e) => {
    formData[e.target.name] = e.target.value;
    setformData((prev) => {
      return { ...formData };
    });
  };
  const roleHandler = (role) => {
    setformData((prev) => {
      return { ...prev, role: role };
    });
  };
  const validatePassword = (e) => {
    if (!e.target.value) {
      error[e.target.name] = "Required";
      setError((prev) => {
        return { ...error };
      });
    } else {
      error[e.target.name] = "";
      setError((prev) => {
        return { ...error };
      });
      if (
        (formData.passwordConfirm !== formData.password) &
        (formData.passwordConfirm.length !== 0)
      ) {
        error["passwordConfirm"] = "Password does not match";
        setError((prev) => {
          return { ...error };
        });
      } else {
        error["passwordConfirm"] = "";
        setError((prev) => {
          return { ...error };
        });
      }
    }
  };
  function validateEmail(e) {
    if (!e.target.value) {
      error[e.target.name] = "Required";
      setError((prev) => {
        return { ...error };
      });
      return;
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
      error[e.target.name] = "";
      setError((prev) => {
        return { ...error };
      });
    } else {
      error[e.target.name] = "Invalid email address";
      setError((prev) => {
        return { ...error };
      });
    }
  }
  const validateConfirmPassword = (e) => {
    if (formData.password !== e.target.value) {
      error[e.target.name] = "Password does not match";
      setError((prev) => {
        return { ...error };
      });
    } else {
      error[e.target.name] = "";
      setError((prev) => {
        return { ...error };
      });
    }
  };
  const validateBeforeRegister = () => {
    for (let key in formData) {
      if (!formData[key]) {
        error[key] = "Required";
        setError((prev) => {
          return { ...error };
        });
      }
    }
  };
  const registerHandler = async () => {
    validateBeforeRegister();
    let data = { email: formData.email, password: formData.password };
    if (formData.role === "patient") {
      try {
        let response = await axios.post(`${api}/user/api/v1/user/patient`, data);
        if (response.status == 201) {
          Swal.fire("SUCCESS!", "Registration Successfull", "success");
          navigate("/login");
        }
      } catch (error) {
        Swal.fire("OOPS!", `${error.response.data.msg}`, "error");
      }
    } else {
      console.log("doctor");
      try {
        var response = await axios.post(`${api}/user/api/v1/user/doctor`, data);
        if (response.status == 201) {
          Swal.fire("SUCCESS!", "Registration Successfull", "success");
          navigate("/login");
        }
      } catch (e) {
        Swal.fire("OOPS!", `${e.response.data.msg}`, "error");
        console.log(error);
        console.log(response);
      }
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div
          className={`col image-container p-5-lg d-flex align-items-center ${styles.imgContainer}`}
        >
          <img
            className={`w-100 ${styles.img}`}
            src={registerImg}
            alt=" group of doctors"
          />
        </div>
        <div className="col form-container d-flex align-items-center">
          <div className={styles.form}>
            <div className="d-flex buttons mb-3">
              <button
                onClick={() => {
                  roleHandler("patient");
                }}
                type="button"
                className={
                  formData.role === "patient"
                    ? `btn btn-outline me-2 ${styles.selected}`
                    : "btn btn-outline me-2"
                }
              >
                Register as Patient
              </button>
              <button
                onClick={() => {
                  roleHandler("doctor");
                }}
                type="button"
                className={
                  formData.role === "doctor"
                    ? `btn btn-outline me-2 ${styles.selected}`
                    : "btn btn-outline me-2"
                }
              >
                Register as Doctor
              </button>
            </div>
            <div className="inputWrapper w-100 mb-3 d-flex flex-column align-items-start">
              <input
                value={formData.username}
                onChange={(e) => {
                  formHandler(e);
                  validateEmail(e);
                }}
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                aria-describedby="emailHelp"
              ></input>
              {error.email ? (
                <>
                  <span className={styles.error}>{error.email}</span>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="inputWrapper w-100 mb-3 d-flex flex-column align-items-start">
              <input
                value={formData.password}
                onChange={(e) => {
                  formHandler(e);
                  validatePassword(e);
                }}
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                aria-describedby="passwordHelp"
              ></input>
              {error.password ? (
                <>
                  <span className={styles.error}>{error.password}</span>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="inputWrapper w-100 mb-3 d-flex flex-column align-items-start">
              <input
                value={formData.passwordConfirm}
                type="password"
                onChange={(e) => {
                  formHandler(e);
                  validateConfirmPassword(e);
                }}
                className="form-control"
                placeholder="Confirm Password"
                name="passwordConfirm"
                aria-describedby="passwordConfirmHelp"
              ></input>
              {error.passwordConfirm ? (
                <>
                  <span className={styles.error}>{error.passwordConfirm}</span>
                </>
              ) : (
                <></>
              )}
            </div>

            <span className="float-start">
              Already a member? <Link to="/login"> Login </Link>
            </span>
            <button
              disabled={
                !error.email & !error.passwordConfirm & !error.password
                  ? false
                  : true
              }
              onClick={registerHandler}
              type="button"
              className={styles.register}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
