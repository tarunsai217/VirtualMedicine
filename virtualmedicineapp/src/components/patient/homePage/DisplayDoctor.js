import React, { useEffect, useState } from "react";

// styles
import { Card, Figure } from "react-bootstrap";
import "./DisplayDoctor.css";
import api from "../../../env";

// const host = "http://localhost:8020/api/v1/user";

export default function DisplayDoctor(props) {
  const [doctordata, setDoctordata] = useState([]);

  const getDoctorData = async (passurl, limit) => {
    const response = await fetch(`${passurl}`);
    const result = await response.json();
    if (limit) {
      setDoctordata(result.slice(0, limit));
    } else {
      setDoctordata(result.slice(0, 3));
    }
  };

  useEffect(() => {
    if (props.passUrl === "") {
      getDoctorData(`${api}/user/api/v1/user/doctor?`);
    } else {
      getDoctorData(props.passUrl, 3);
    }
  }, [props.passUrl]);

  const handleViewMore = (e) => {
    if (props.passUrl === "") {
      getDoctorData(`${api}/user/api/v1/user/doctor`, 6);
    } else {
      getDoctorData(props.passUrl, 6);
    }
    e.target.style.display = "none";
  };

  // const handleViewClick = (e) =>  {
  //   let email = e.target.parentElement.parentElement.parentElement.children[0].innerText;
  //   props.passEmail(data);
  // };

  const checkData = doctordata.length <= 0 ? true : false;
  const checkLenfth = doctordata.length >= 3 ? true : false;

  return (
    <div className="displayDoctorMain">
      <h2>Currently Available Doctors</h2>
      <div className="row">
        {checkData && <p>Sry no Doctor's Available!!!</p>}
        {doctordata.map((data) => (
          <div key={data.mobileNo} className="col-12 col-md-4">
            <Card className="text-center">
              <Figure>
                <Figure.Image
                  width={171}
                  height={180}
                  alt="171x180"
                  src="/docIcon.png"
                />
              </Figure>
              <Card.Body>
                <Card.Text hidden>{data.email}</Card.Text>
                <Card.Text>
                  <strong>Name: </strong>
                  {data.name}
                </Card.Text>
                <Card.Text>
                  <strong>Mobile No: </strong>
                  {data.mobileNo}
                </Card.Text>
                <Card.Text>
                  <strong>City: </strong>
                  {data.city}
                </Card.Text>
                <Card.Text>
                  <strong>Specialization: </strong>
                  {data.specialization}
                </Card.Text>
                <Card.Text>
                  <strong>Experience: </strong>
                  {data.experience}
                </Card.Text>
                <Card.Text>
                  <button
                    className="viewDoc"
                    onClick={() => props.passEmail(data)}
                  >
                    View
                  </button>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      {checkLenfth && (
        <button onClick={handleViewMore} className="viewMore">
          View More..
        </button>
      )}
    </div>
  );
}
