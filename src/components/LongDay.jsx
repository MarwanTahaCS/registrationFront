import React from "react";
import { useState } from "react";
import Assistants from "./Assistants";
import Teachers from "./Teachers";

export default function LongDay(props) {
  const [longDayData, setLongDayData] = useState(props.longDayDetails);

  function updateTeachers(teachers) {
    let newTeachers = longDayData.staff;
    newTeachers.teachers = [...teachers];
    setLongDayData((prevValue) => {
      return {
        ...prevValue,
        staff: newTeachers,
      };
    });
    props.updateLongDay({
      ...longDayData,
      staff: newTeachers,
    });
  }

  function updateAssistants(assistants) {
    let newAssistants = longDayData.staff;
    newAssistants.assistants = [...assistants];
    setLongDayData((prevValue) => {
      return {
        ...prevValue,
        staff: newAssistants,
      };
    });
    props.updateLongDay({
      ...longDayData,
      staff: newAssistants,
    });
  }

  function updateLongWorkDayHours(event) {
    const { value, name } = event.target;
    setLongDayData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
    props.updateLongDay({
      ...longDayData,
      [name]: value,
    });
  }

  return (
    <div className="container list-group p-3">
      <div className="list-group-item d-flex justify-content-between lh-sm">
        <Teachers updateTeachers={updateTeachers} t={props.t} teachers={longDayData.staff.teachers} />
      </div>
      <div className="list-group-item d-flex justify-content-between lh-sm">
        <Assistants updateAssistants={updateAssistants} t={props.t} assistants={longDayData.staff.assistants} />
      </div>
      <div className="list-group-item  justify-content-between lh-sm text-center">
        <div className="row">
          <div className="col col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4 col-xxl-3">
            <span className="input-group-text">{props.t('Classes.22')}</span>
          </div>
          <div className="col col-12 col-sm-4 col-md-6 col-lg-7 col-xl-8 col-xxl-9">
            <div className="input-group" dir="ltr">
              <input
                type="text"
                name={"startOfLongDayHours"}
                value={longDayData.startOfLongDayHours}
                onChange={updateLongWorkDayHours}
                placeholder="Start of work day"
                className="form-control"
              />
              <input
                type="text"
                name="endOfLongDayHours"
                value={longDayData.endOfLongDayHours}
                onChange={updateLongWorkDayHours}
                placeholder="End of work day"
                className="form-control"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
