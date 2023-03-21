import React from "react";
import { useState } from "react";
import Assistants from "./Assistants";
import Teachers from "./Teachers";

export default function OrgDetails(props) {
  const [orgDetailsData, setOrgDetailsData] = useState(props.orgDetails);

  function updateOrgDetails(event) {
    const { value, name } = event.target;
    setOrgDetailsData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
    props.updateOrgDetails(orgDetailsData);
  }

  function updateStaffData(event) {
    const { value, name, id } = event.target;
    let staff = orgDetailsData.staff;
    staff[id][name] = value;
    //   newAssistants.assistants = [...assistants];
    setOrgDetailsData((prevValue) => {
      return {
        ...prevValue,
        ["staff"]: staff,
      };
    });
    props.updateOrgDetails(orgDetailsData);
  }

  const staffOptions = [
    { value: '', text: props.t('OrgDetails.5') },
    { value: 'manager', text: props.t('OrgDetails.16') },
    { value: 'secretary', text: props.t('OrgDetails.6') },
    { value: 'security manager', text: props.t('OrgDetails.7') },
    { value: 'other', text: props.t('OrgDetails.8') }
  ];

  function remove(index) {
    let newStaff = [...orgDetailsData.staff];
    newStaff.splice(index, 1);
    setOrgDetailsData((prevValue) => {
      return {
        ...prevValue,
        ["staff"]: newStaff,
      };
    });
    props.updateOrgDetails({
      ...orgDetailsData,
      ["staff"]: newStaff,
    });
  }

  function addStaffMember() {
    let newStaff = [...orgDetailsData.staff, {
      position: "other",
      name: "",
      phoneNumber: "",
      email: ""
    }];
    setOrgDetailsData((prevValue) => {
      return {
        ...prevValue,
        ["staff"]: newStaff,
      };
    });
    props.updateOrgDetails({
      ...orgDetailsData,
      ["staff"]: newStaff,
    });
  }

  return (
    <div className="card m-3">
      <h5 className="p-3">
        {props.t('OrgDetails.1')} <span className="text-danger">*</span>
      </h5>
      <div className="input-group px-3 pb-3" dir="ltr">
        <span className="input-group-text" id="basic-addon1">
          {props.t('OrgDetails.2')}
        </span>
        <input
          className="form-control"
          onChange={updateOrgDetails}
          type="text"
          name="organizationName"
          placeholder={props.t('OrgDetails.3')}
          autoComplete="off"
          id="organizationName"
          value={orgDetailsData.organizationName}
        />
      </div>
      <div className="input-group px-3 pb-3" dir="ltr">
        <span className="input-group-text" id="basic-addon1">
          {props.t('OrgDetails.14')}
        </span>
        <input
          className="form-control"
          onChange={updateOrgDetails}
          type="text"
          name="orgLogo"
          placeholder={props.t('OrgDetails.15')}
          autoComplete="off"
          id="orgLogo"
          value={orgDetailsData.orgLogo}
        />
      </div>

      <h5 className="p-3">{props.t('OrgDetails.13')} <span className="text-danger">*</span></h5>

      {orgDetailsData.staff.map((staffMember, index) => {
        return <ul className="conatiner py-0 px-3">
          <li key={index} className="d-flex justify-content-between lh-sm" >
          <div key={index} className="input-group" dir="ltr">
          <select className="input-group-text form-select" value={staffMember.position} name="position" id={index} onChange={updateStaffData}>
            {staffOptions.map(option => (
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
            placeholder={props.t('OrgDetails.9')}
            autoComplete="off"
            value={staffMember.name}
            id={index}
          />
          <input
            className="form-control bg-light"
            onChange={updateStaffData}
            type="text"
            name="phoneNumber"
            placeholder={props.t('OrgDetails.10')}
            autoComplete="off"
            value={staffMember.phoneNumber}
            id={index}
          />
          <input
            className="form-control bg-light"
            onChange={updateStaffData}
            type="email"
            name="email"
            placeholder={props.t('OrgDetails.11')}
            autoComplete="off"
            value={staffMember.email}
            id={index}
          />
          </div>
          <div className="px-1">
            <i className="material-icons" onClick={() => remove(index)} style={{ color: "red", fontSize: "36px" }}>delete</i>
          </div>
          </li>
        </ul>
      })}

      <div className="px-3 pb-3">
        <button className="btn btn-primary btn-sm" onClick={() => addStaffMember()}>
        {props.t('OrgDetails.12')}
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
            id="degitalPaymentServices"
          />
          <label className="form-check-label" for="degitalPaymentServices">
            {props.t('OrgDetails.4')}
          </label>
        </div>
      </div>
    </div>
  );
}
