import React, { useState } from "react";
// Styles
import { Button, Form } from "react-bootstrap";
import "./SearchDoctor.css";
import api from "../../../env"

// let host = "http://localhost:8020/api/v1/user";

export default function SearchDoctor(props) {
  const [filterDisplay, setFilterDisplay] = useState(false);

  const handleSearchBarClick = () => {
    setFilterDisplay(true);
    setTimeout(() => {
      setFilterDisplay(false);
    }, 20000);
  };

  const handleSearchClick = (e) => {
    let docName = document.querySelector("#formBasicSearch").value;
    let byLocation = document.querySelector('input[name="byLocation"]:checked');

    let bySpecial = document.querySelector('input[name="bySpecial"]:checked');

    let updateUrl = "";

    if (docName !== "" && byLocation === "" && bySpecial === "") {
      updateUrl = `${api}/user/api/v1/user/doctor/${docName}`;
    } else {
      if (docName) {
        updateUrl = `${api}/user/api/v1/user/doctor/${docName}`;
      }
      if (byLocation !== null) {
        if (bySpecial === null) {
          let selectedLocation =
            byLocation.nextElementSibling.innerText.toLowerCase();
          updateUrl = `${api}/user/api/v1/user/doctor/city/specialization?city=${selectedLocation}&specialization=`;
        } else {
          let selectedLocation =
            byLocation.nextElementSibling.innerText.toLowerCase();
          let selectedSpecial =
            bySpecial.nextElementSibling.innerText.toLowerCase();
          updateUrl = `${api}/user/api/v1/user/doctor/city/specialization?city=${selectedLocation}&specialization=${selectedSpecial}`;
        }
      }
      if (bySpecial !== null) {
        if (byLocation === null) {
          let selectedSpecial =
            bySpecial.nextElementSibling.innerText.toLowerCase();
          updateUrl = `${api}/user/api/v1/user/doctor/city/specialization?city=&specialization=${selectedSpecial}`;
        } else {
          let selectedLocation =
            byLocation.nextElementSibling.innerText.toLowerCase();
          let selectedSpecial =
            bySpecial.nextElementSibling.innerText.toLowerCase();
          updateUrl = `${api}/user/api/v1/user/doctor/city/specialization?city=${selectedLocation}&specialization=${selectedSpecial}`;
        }
      }
      // if(byLocation.length !== 0){
      //   if(updateUrl === ''){
      //     let selectedLocation = '';
      //     for(let i =0; i<byLocation.length;i++){
      //       selectedLocation = byLocation[i].nextElementSibling.innerText.toLowerCase();
      //       if(i === 0 ){
      //         updateUrl = `https://virtualmedicine.stackroute.io/api/v1/user/doctor/${selectedLocation}`
      //       }
      //       updateUrl += `&city=${selectedLocation}`;
      //     }
      //   }else {
      //     let selectedLocation = '';
      //     for(let i =0; i<byLocation.length;i++){
      //       selectedLocation = byLocation[i].nextElementSibling.innerText.toLowerCase();
      //       updateUrl += `&city=${selectedLocation}`;
      //     }
      //   }
      // }
      // if(bySpecial.length !== 0){
      //   if(updateUrl === ''){
      //     let selectedSpecial = '';
      //     for(let i =0; i<bySpecial.length;i++){
      //       selectedSpecial = bySpecial[i].nextElementSibling.innerText.toLowerCase();
      //       if(i === 0 ){
      //         updateUrl = `http://localhost:3000/doctor?specialization=${selectedSpecial}`
      //       }
      //       updateUrl += `&specialization=${selectedSpecial}`;
      //     }
      //   }else {
      //     let selectedSpecial = '';
      //     for(let i =0; i<bySpecial.length;i++){
      //       selectedSpecial = bySpecial[i].nextElementSibling.innerText.toLowerCase();
      //       updateUrl += `&specialization=${selectedSpecial}`;
      //     }
      //   }
      // }

      props.passUrl(updateUrl);
    }
  };

  return (
    <div className="seacrchDoctorMain">
      <div className="row justify-content-center">
        <div className="col-11 col-md-6">
          <h2>Find and Book a Doctor</h2>
          <div className="row">
            <div className="col-11 col-md-10" style={{ height: "50px" }}>
              <div className="searchBar">
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicSearch">
                    <Form.Control
                      type="text"
                      onClick={handleSearchBarClick}
                      placeholder="Search for a doctor"
                    />
                    <Form.Text className="text-muted align-left">
                      Ex:Search by Doctor name.
                    </Form.Text>
                  </Form.Group>
                </Form>
              </div>
            </div>
            <div className="col-11 col-md-2">
              <Button id="btnSearch" onClick={handleSearchClick}>
                Search
              </Button>
            </div>
            {filterDisplay && (
              <div className="filterOptions">
                {/* <div className="date">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicDate">
                      <Form.Control type="date" placeholder="" />
                    </Form.Group>
                </Form>
              </div> */}
                <div className="row">
                  <div className="col-11 col-md-6">
                    <div className="row justify-content-center">
                      <div className="col-10">
                        <h4>By Locattion</h4>
                        <Form>
                          <Form.Group className="mb-3">
                            <Form.Check
                              name="byLocation"
                              type="radio"
                              label={`TamilNadu`}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Check
                              name="byLocation"
                              type="radio"
                              label={`Delhi`}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Check
                              name="byLocation"
                              type="radio"
                              label={`AndhraPradesh`}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Check
                              name="byLocation"
                              type="radio"
                              label={`Kerala`}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Check
                              name="byLocation"
                              type="radio"
                              label={`UttarPradesh`}
                            />
                          </Form.Group>
                        </Form>
                      </div>
                    </div>
                  </div>
                  <div className="col-11 col-md-6">
                    <div className="row justify-content-center">
                      <div className="col-10">
                        <h4>By Specialication</h4>
                        <Form>
                          <Form.Group className="mb-3">
                            <Form.Check
                              name="bySpecial"
                              type="radio"
                              label={`Medicine`}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Check
                              name="bySpecial"
                              type="radio"
                              label={`Ortho`}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Check
                              name="bySpecial"
                              type="radio"
                              label={`Diabetes`}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Check
                              name="bySpecial"
                              type="radio"
                              label={`Neurology`}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Check
                              name="bySpecial"
                              type="radio"
                              label={`Cardiologist`}
                            />
                          </Form.Group>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
