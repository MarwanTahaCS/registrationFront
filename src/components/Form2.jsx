import React from "react";
import { useState } from "react";
import Teachers from "./Teachers";
import Assistants from "./Assistants";
import LongDay from "./LongDay";

export default function Form2(props) {
  const [note, setNote] = useState({
    organizationName: "",
    classes: {
      numberOfClasses: 0,
      classes: [],
    },
  });

  function changeHandler(event) {
    const { value, name } = event.target;
    setNote((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }
  function updateClassName(event) {
    const { value, name } = event.target;
    let newClasses = note.classes;
    newClasses.classes[name].className = value;
    setNote((prevValue) => {
      return {
        ...prevValue,
        ["classes"]: newClasses,
      };
    });
  }
  const arrayRange = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (value, index) => start + index * step
    );
  function addClass(event) {
    let newClasses = note.classes;
    newClasses.numberOfClasses = newClasses.numberOfClasses + 1;
    newClasses.classes.push({
      className: "",
      staff: {
        teachers: [],
        assistants: [],
      },
      workDays: [false, false, false, false, false, false, false],
      startOfDay: "08:00",
      endOfDay: "15:30",
      longDay: {
        isLongDay: false,
        staff: [],
        startOfLongDayHours: "15:30",
        endOfLongDayHours: "18:00",
      },
    });
    setNote((prevValue) => {
      return {
        ...prevValue,
        ["classes"]: newClasses,
      };
    });
  }

  function updateTeachers(teachers, classIndex) {
    let classes = note.classes;
    classes.classes[classIndex].staff.teachers = [...teachers];
    setNote((prevValue) => {
      return {
        ...prevValue,
        ["classes"]: classes,
      };
    });
  }

  function updateAssistants(assistants, classIndex) {
    let classes = note.classes;
    classes.classes[classIndex].staff.assistants = [...assistants];
    setNote((prevValue) => {
      return {
        ...prevValue,
        ["classes"]: classes,
      };
    });
  }

  function updateLongDay(longDayData, classIndex) {
    let classes = note.classes;
    classes.classes[classIndex].longDay = {
      ...classes.classes[classIndex].longDay,
      ["staff"]: longDayData.staff,
      ["startOfLongDayHours"]: longDayData.startOfLongDayHours,
      ["endOfLongDayHours"]: longDayData.endOfLongDayHours,
    };
    setNote((prevValue) => {
      return {
        ...prevValue,
        ["classes"]: classes,
      };
    });
  }

  function submit() {
    console.log(note);
  }

  const handleClick = (event, day, classIndex) => {
    event.currentTarget.classList.toggle("btn-success");
    event.currentTarget.classList.toggle("text-white");

    console.log(classIndex);

    let classes = note.classes;
    classes.classes[classIndex].workDays[day] = classes.classes[classIndex]
      .workDays[day]
      ? false
      : true;

    setNote((prevValue) => {
      return {
        ...prevValue,
        ["classes"]: classes,
      };
    });
  };

  function updateStartOfWorkDay(event) {
    const { value, name } = event.target;
    let newClasses = note.classes;
    newClasses.classes[name].startOfDay = value;
    setNote((prevValue) => {
      return {
        ...prevValue,
        ["classes"]: newClasses,
      };
    });
  }
  function updateEndOfWorkDay(event) {
    const { value, name } = event.target;
    let newClasses = note.classes;
    newClasses.classes[name].endOfDay = value;
    setNote((prevValue) => {
      return {
        ...prevValue,
        ["classes"]: newClasses,
      };
    });
  }
  function longDayStatus(event) {
    const { name } = event.target;
    let newClasses = note.classes;
    newClasses.classes[name].longDay.isLongDay = newClasses.classes[name]
      .longDay.isLongDay
      ? false
      : true;
    setNote((prevValue) => {
      return {
        ...prevValue,
        ["classes"]: newClasses,
      };
    });
  }

  return (
    <div className="container py-3">
      {/*className="form">*/}
      <div className="mb-3">
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">
            Organization Name
          </span>
          <input
            className="form-control"
            onChange={changeHandler}
            type="text"
            name="organizationName"
            placeholder="Organization Name"
            autoComplete="off"
            id="organizationName"
            value={note.organizationName}
          />
        </div>
      </div>
      <div className="mb-3">
        <p className="form-label">Classes</p>
        {note.numberOfClasses != 0 &&
          arrayRange(1, note.classes.numberOfClasses, 1).map(
            (currentValue, index) => {
              return (
                <ul className="list-group mb-3">
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between lh-sm"
                  >
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon1">
                        Class Name
                      </span>
                      <input
                        className="form-control form-control-lg"
                        onChange={updateClassName}
                        type="text"
                        name={`${index}`}
                        placeholder={`Class name ${index + 1}`}
                        autoComplete="off"
                        value={note.classes.classes[index].className}
                      />
                    </div>
                  </li>

                  <div className="list-group-item d-flex justify-content-between lh-sm">
                    <Teachers
                      updateTeachers={(teachers) =>
                        updateTeachers(teachers, index)
                      }
                    />
                  </div>
                  <div className="list-group-item d-flex justify-content-between lh-sm">
                    <Assistants
                      updateAssistants={(assistants) =>
                        updateAssistants(assistants, index)
                      }
                    />
                  </div>

                  <div className="list-group-item  text-center">
                    <div className="row g-1 g-md-2">
                      <div className="col-12 col-md-6">
                        <span className="input-group-text" id="basic-addon1">
                          Press on the active days of the week
                        </span>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="input-group input-group mb-3 d-flex justify-content-center">
                          <button
                            className="btn"
                            onClick={(e) => {
                              handleClick(e, 0, index);
                            }}
                            type="button"
                          >
                            Sunday
                          </button>
                          <button
                            className="btn"
                            onClick={(e) => {
                              handleClick(e, 1, index);
                            }}
                            type="button"
                          >
                            Monday
                          </button>
                          <button
                            className="btn"
                            onClick={(e) => {
                              handleClick(e, 2, index);
                            }}
                            type="button"
                          >
                            Tuesday
                          </button>
                          <button
                            className="btn"
                            onClick={(e) => {
                              handleClick(e, 3, index);
                            }}
                            type="button"
                          >
                            Wednesday
                          </button>
                          <button
                            className="btn"
                            onClick={(e) => {
                              handleClick(e, 4, index);
                            }}
                            type="button"
                          >
                            Thursday
                          </button>
                          <button
                            className="btn"
                            onClick={(e) => {
                              handleClick(e, 5, index);
                            }}
                            type="button"
                          >
                            Friday
                          </button>
                          <button
                            className="btn"
                            onClick={(e) => {
                              handleClick(e, 6, index);
                            }}
                            type="button"
                          >
                            Saturday
                          </button>
                        </div>
                      </div>
                    </div>



                  </div>

                  <div className="list-group-item d-flex justify-content-between lh-sm text-center">
                    <div class="input-group">
                      <div class="input-group-text">
                        Start and End of work day
                      </div>
                      <input
                        type="text"
                        name={`${index}`}
                        value={note.classes.classes[index].startOfDay}
                        onChange={updateStartOfWorkDay}
                        placeholder="Start of work day"
                        class="form-control"
                      />
                      <input
                        type="text"
                        name={`${index}`}
                        value={note.classes.classes[index].endOfDay}
                        onChange={updateEndOfWorkDay}
                        placeholder="End of work day"
                        class="form-control"
                      />
                    </div>
                  </div>

                  <div className="list-group-item  col">
                    <div class="form-check">
                      <input
                        name={`${index}`}
                        onChange={longDayStatus}
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="defaultCheck1"
                      />
                      <label class="form-check-label" for="defaultCheck1">
                        {note.classes.classes[index].className === ""
                          ? "This class"
                          : note.classes.classes[index].className}{" "}
                        has long day hours
                      </label>
                    </div>
                    <div class="row">
                      {note.classes.classes[index].longDay.isLongDay && (
                        <LongDay
                          updateLongDay={(longDayData) =>
                            updateLongDay(longDayData, index)
                          }
                        />
                      )}
                    </div>
                  </div>
                </ul>
              );
            }
          )}

        <div className="mb-3">
          <button
            className="btn btn-primary"
            onClick={addClass}
            value={note.classes.numberOfClasses}
          >
            Add Class
          </button>
        </div>

        <div className="mb-3">
          <button className="btn btn-primary" onClick={submit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

//----------------------------------------------------------------------------
/*{
          className: "",
          teachers: [
            {
              name: "",
              phoneNumber: ""
            }
          ],
          assistants: [
            {
              name: "",
              phoneNumber: ""
            }
          ],
          daysOfTeaching: {
            sunday: true,
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: false,
            saturday: false
          },
          attendanceHours: "8:00-15:00"
        }*/
