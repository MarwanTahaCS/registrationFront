import React from "react";
import { useState } from "react";
import Assistants from "./Assistants";
import Teachers from "./Teachers";

export default function LongDay(props) {
  const [longDayData, setLongDayData] = useState({
    staff: {
      teachers: [],
      assistants: [],
    },
    startOfLongDayHours: "13:30",
    endOfLongDayHours: "15:00",
  });

  function updateTeachers(teachers) {
    let newTeachers = longDayData.staff;
    newTeachers.teachers = [...teachers];
    setLongDayData((prevValue) => {
      return {
        ...prevValue,
        ["staff"]: newTeachers,
      };
    });
    props.updateLongDay(longDayData);
  }

  function updateAssistants(assistants) {
    let newAssistants = longDayData.staff;
    newAssistants.assistants = [...assistants];
    setLongDayData((prevValue) => {
      return {
        ...prevValue,
        ["staff"]: newAssistants,
      };
    });
    props.updateLongDay(longDayData);
  }

  function updateLongWorkDayHours(event) {
    const { value, name } = event.target;
    setLongDayData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
    props.updateLongDay(longDayData);
  }

  return (
    <div className="container list-group p-3">
      <div className="list-group-item d-flex justify-content-between lh-sm">
        <Teachers updateTeachers={updateTeachers} />
      </div>
      <div className="list-group-item d-flex justify-content-between lh-sm">
        <Assistants updateAssistants={updateAssistants} />
      </div>
      <div className="list-group-item  justify-content-between lh-sm text-center">
        <div className="row">
          <div className="col col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4 col-xxl-3">
            <span class="input-group-text">Start and End of extra work hours</span>
          </div>
          <div className="col col-12 col-sm-4 col-md-6 col-lg-7 col-xl-8 col-xxl-9">
            <div class="input-group">
              <input
                type="text"
                name={"startOfLongDayHours"}
                value={longDayData.startOfLongDayHours}
                onChange={updateLongWorkDayHours}
                placeholder="Start of work day"
                class="form-control"
              />
              <input
                type="text"
                name="endOfLongDayHours"
                value={longDayData.endOfLongDayHours}
                onChange={updateLongWorkDayHours}
                placeholder="End of work day"
                class="form-control"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
