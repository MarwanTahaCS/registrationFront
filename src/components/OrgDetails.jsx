import React from "react";
import { useState } from "react";
import axios from "axios";

export default function OrgDetails(props) {
  const [orgDetailsData, setOrgDetailsData] = useState(props.orgDetails);

  function imageChange(event) {
    const data = new FormData();
    data.append(`logo`, event.target.files[0]);

    axios
      .post(localUrl, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.warn(res);
        setLogoID(res.data.logoID);
      })
      .catch((err) => console.log(err));
  }

  function setLogoID(logoID) {
    setOrgDetailsData((prevValue) => {
      return {
        ...prevValue,
        logoID: logoID,
      };
    });
    props.updateOrgDetails({
      ...orgDetailsData,
      logoID: logoID,
    });
  }

  function updateOrgDetails(event) {
    const { value, name } = event.target;
    setOrgDetailsData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
    props.updateOrgDetails({
      ...orgDetailsData,
      [name]: value,
    });
  }

  function updateStaffData(event) {
    const { value, name, id } = event.target;
    let staff = orgDetailsData.staff;
    staff[id][name] = value;
    //   newAssistants.assistants = [...assistants];
    setOrgDetailsData((prevValue) => {
      return {
        ...prevValue,
        staff: staff,
      };
    });
    props.updateOrgDetails({
      ...orgDetailsData,
      [name]: value,
    });
  }

  const staffOptions = [
    { value: "", text: props.t("OrgDetails.5") },
    { value: "manager", text: props.t("OrgDetails.16") },
    { value: "secretary", text: props.t("OrgDetails.6") },
    { value: "security manager", text: props.t("OrgDetails.7") },
    { value: "other", text: props.t("OrgDetails.8") },
  ];

  function remove(index) {
    let newStaff = [...orgDetailsData.staff];
    newStaff.splice(index, 1);
    setOrgDetailsData((prevValue) => {
      return {
        ...prevValue,
        staff: newStaff,
      };
    });
    props.updateOrgDetails({
      ...orgDetailsData,
      staff: newStaff,
    });
  }

  function addStaffMember() {
    let newStaff = [
      ...orgDetailsData.staff,
      {
        position: "other",
        name: "",
        phoneNumber: "",
        email: "",
      },
    ];
    setOrgDetailsData((prevValue) => {
      return {
        ...prevValue,
        staff: newStaff,
      };
    });
    props.updateOrgDetails({
      ...orgDetailsData,
      staff: newStaff,
    });
  }

  // const localUrl = "http://localhost:3001/api/logoUpload/";
  const localUrl = "https://admin.myvarno.io/api/logoUpload/";

  return (
    <div className="card m-3">
      <div className="row">
        <div className="col col-12 col-sm-7 col-md-8 col-xl-9">
          <h5 className="p-3">
            {props.t("OrgDetails.1")} <span className="text-danger">*</span>
          </h5>
          <div className="input-group px-3 pb-3" dir="ltr">
            <span className="input-group-text" id="basic-addon1">
              {props.t("OrgDetails.2")}
            </span>
            <input
              className="form-control"
              onChange={updateOrgDetails}
              type="text"
              name="organizationName"
              placeholder={props.t("OrgDetails.3")}
              autoComplete="off"
              id="organizationName"
              value={orgDetailsData.organizationName}
            />
          </div>
          <h6 className="px-3 pb-3">{props.t("OrgDetails.17")}</h6>
          <div className="input-group px-3 pb-3" dir="ltr">
            <input
              type="file"
              className="form-control"
              name="upload_file"
              onChange={imageChange}
            />
          </div>
        </div>
        <div className="col col-12 col-sm-5 col-md-4 col-xl-3">
          <div className="input-group" dir="ltr">
            {orgDetailsData.logoID !== "" && (
              <div className="p-3 ">
                <img
                  className="img-thumbnail"
                  src={`${localUrl}${orgDetailsData.logoID}`}
                ></img>
              </div>
            )}
          </div>
        </div>
      </div>

      <h5 className="p-3">
        {props.t("OrgDetails.13")} <span className="text-danger">*</span>
      </h5>

      {orgDetailsData.staff.map((staffMember, index) => {
        return (
          <ul className="conatiner py-0 px-3">
            <li key={index} className="d-flex justify-content-between lh-sm">
              <div key={index} className="input-group" dir="ltr">
                <select
                  className="input-group-text form-select"
                  value={staffMember.position}
                  name="position"
                  id={index}
                  onChange={updateStaffData}
                >
                  {staffOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
                <input
                  className="form-control bg-light"
                  onChange={updateStaffData}
                  type="text"
                  name="name"
                  placeholder={props.t("OrgDetails.9")}
                  autoComplete="off"
                  value={staffMember.name}
                  id={index}
                />
                <input
                  className="form-control bg-light"
                  onChange={updateStaffData}
                  type="text"
                  name="phoneNumber"
                  placeholder={props.t("OrgDetails.10")}
                  autoComplete="off"
                  value={staffMember.phoneNumber}
                  id={index}
                />
                <input
                  className="form-control bg-light"
                  onChange={updateStaffData}
                  type="email"
                  name="email"
                  placeholder={props.t("OrgDetails.11")}
                  autoComplete="off"
                  value={staffMember.email}
                  id={index}
                />
              </div>
              <div className="px-1">
                <i
                  className="material-icons"
                  onClick={() => remove(index)}
                  style={{ color: "red", fontSize: "36px" }}
                >
                  delete
                </i>
              </div>
            </li>
          </ul>
        );
      })}

      <div className="px-3 pb-3">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => addStaffMember()}
        >
          {props.t("OrgDetails.12")}
        </button>
      </div>

      <div className="px-3 pb-3" dir="ltr">
        <div className="form-check">
          <input
            name="degitalPaymentServices"
            onChange={props.digitalPaymentStatus}
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckChecked"
            defaultChecked={props.digitalPayment.iswanted}
          />
          <label className="form-check-label" for="flexCheckChecked">
            {props.t("OrgDetails.4")}
          </label>
        </div>
      </div>
    </div>
  );
}
