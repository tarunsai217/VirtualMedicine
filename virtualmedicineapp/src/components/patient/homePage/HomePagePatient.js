import React, { useState } from "react";

// Components
import DisplayDoctor from "./DisplayDoctor";
import SearchDoctor from "./SearchDoctor";
import DoctorProfile from "../doctorProfile/DoctorProfile";

// styles
import "./HomePagePatient.css";
// import { Button, Modal } from 'react-bootstrap'

export default function HomePagePatient() {
  const [modalShow, setModalShow] = React.useState(false);
  const [urlData, setUrlData] = useState("");
  const [data, setData] = useState([]);

  const handlePassUrl = (value) => {
    setUrlData(value);
  };

  const handlePassEmail = (value) => {
    setModalShow(true);
    setData(value);
  };

  return (
    <div className="homePagePatient">
      <SearchDoctor passUrl={handlePassUrl} />
      <DisplayDoctor passUrl={urlData} passEmail={handlePassEmail} />
      {modalShow && (
        <DoctorProfile
          data={data}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      )}
    </div>
  );
}
