import React from "react";
import { useState } from "react";
import Teachers from "./Teachers";
import Assistants from "./Assistants";
import LongDay from "./LongDay";
import PaymentSubForm from "./PaymentSubForm";

export default function Form2(props) {
  const [note, setNote] = useState({
    organizationName: "",
    digitalPayment: {
      iswanted: false,
      details: {},
    },
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
  function updateClassLocation(event) {
    const { value, name } = event.target;
    let newClasses = note.classes;
    newClasses.classes[name].classLocation = value;
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
      classLocation: "",
      staff: {
        teachers: [],
        assistants: [],
      },
      workDays: [false, false, false, false, false, false, false],
      startOfDay: "08:00",
      endOfDay: "13:30",
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

  function updatePaymentData(paymentData) {
    let newForm = note.digitalPayment;
    newForm = {
      ...newForm,
      ["details"]: paymentData,
    };
    setNote((prevValue) => {
      return {
        ...prevValue,
        ["digitalPayment"]: newForm,
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

  function digitalPaymentStatus(event) {
    let form = note;
    form.digitalPayment.iswanted = form.digitalPayment.iswanted ? false : true;
    setNote(form);
  }

  return (
    <div className="container py-3">
      {/*className="form">*/}
      <div className="card m-3">
        <h2 className="pt-3 px-3">
          <strong>Registration Form</strong>
        </h2>
        <p className="px-4 mb-1">
          Please fill in you organization's information below so we can start
          preparing your workspace at Varno.
        </p>
        <p className="px-4 text-danger">* Required</p>
      </div>

      <div className="card m-3">
        <h5 className="p-3">
          Organization Details <span className="text-danger">*</span>
        </h5>
        <div className="input-group px-3 pb-3">
          <span className="input-group-text" id="basic-addon1">
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
        <div className="px-3 pb-3">
          <div className="form-check">
            <input
              name="degitalPaymentServices"
              onChange={digitalPaymentStatus}
              className="form-check-input"
              type="checkbox"
              value=""
              id="degitalPaymentServices"
            />
            <label className="form-check-label" for="degitalPaymentServices">
              I am interested in using Varno's digital payment service
            </label>
          </div>
        </div>
      </div>

      <div className="card m-3">
        <div className="p-3">
          <h5 className="">
            Classes <span className="text-danger">*</span>
          </h5>
          {note.numberOfClasses != 0 &&
            arrayRange(1, note.classes.numberOfClasses, 1).map(
              (currentValue, index) => {
                return (
                  <ul className="list-group m-1 my-4">
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between lh-sm "
                    >
                      <div className="col">
                        <div className="row py-2">
                          <div className="input-group">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              Class Name
                            </span>
                            <input
                              className="form-control"
                              onChange={updateClassName}
                              type="text"
                              name={`${index}`}
                              placeholder={`Class name ${index + 1}`}
                              autoComplete="off"
                              value={note.classes.classes[index].className}
                            />
                          </div>
                        </div>
                        <div className="row py-2">
                          <div className="input-group">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              Class Location
                            </span>
                            <input
                              className="form-control"
                              onChange={updateClassLocation}
                              type="text"
                              name={`${index}`}
                              placeholder={`Class location ${index + 1}`}
                              autoComplete="off"
                              value={note.classes.classes[index].classLocation}
                            />
                          </div>
                        </div>
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
                        <div className="col-12 ">
                          <span
                            className="input-group-text  "
                            id="basic-addon1"
                          >
                            Press on the active week days
                          </span>
                        </div>
                        <div className="col-12 ">
                          <div className="d-flex ">
                            <div className="row px-md-3">
                              <button
                                className="btn btn-sm col"
                                onClick={(e) => {
                                  handleClick(e, 0, index);
                                }}
                                type="button"
                              >
                                Sunday
                              </button>
                              <button
                                className="btn btn-sm col"
                                onClick={(e) => {
                                  handleClick(e, 1, index);
                                }}
                                type="button"
                              >
                                Monday
                              </button>
                              <button
                                className="btn btn-sm col"
                                onClick={(e) => {
                                  handleClick(e, 2, index);
                                }}
                                type="button"
                              >
                                Tuesday
                              </button>
                              <button
                                className="btn btn-sm col"
                                onClick={(e) => {
                                  handleClick(e, 3, index);
                                }}
                                type="button"
                              >
                                Wednesday
                              </button>
                              <button
                                className="btn btn-sm col"
                                onClick={(e) => {
                                  handleClick(e, 4, index);
                                }}
                                type="button"
                              >
                                Thursday
                              </button>
                              <button
                                className="btn btn-sm col"
                                onClick={(e) => {
                                  handleClick(e, 5, index);
                                }}
                                type="button"
                              >
                                Friday
                              </button>
                              <button
                                className="btn btn-sm col"
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
                    </div>

                    <div className="list-group-item  justify-content-between lh-sm text-center">
                      <div className="row">
                        <div className="col col-12 col-sm-6 col-md-4 col-xl-3">
                          <span className="input-group-text">
                            Fill in work day hours
                          </span>
                        </div>
                        <div className="col col-12 col-sm-6 col-md-8 col-xl-9">
                          <div className="input-group">
                            <input
                              type="text"
                              name={`${index}`}
                              value={note.classes.classes[index].startOfDay}
                              onChange={updateStartOfWorkDay}
                              placeholder="Start of work day"
                              className="form-control"
                            />
                            <input
                              type="text"
                              name={`${index}`}
                              value={note.classes.classes[index].endOfDay}
                              onChange={updateEndOfWorkDay}
                              placeholder="End of work day"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="list-group-item  col">
                      <div className="form-check">
                        <input
                          name={`${index}`}
                          onChange={longDayStatus}
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id={"defaultCheck1" + `${index}`}
                        />
                        <label
                          className="form-check-label"
                          for={"defaultCheck1" + `${index}`}
                        >
                          {note.classes.classes[index].className === ""
                            ? "This class"
                            : note.classes.classes[index].className}{" "}
                          has long day hours
                        </label>
                      </div>
                      <div className="row">
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
        </div>
        <div className="p-3">
          <button
            className="btn btn-primary"
            onClick={addClass}
            value={note.classes.numberOfClasses}
          >
            Add Class
          </button>
        </div>
      </div>

      {note.digitalPayment.iswanted && (
        <div className="card m-3">
          <div className="px-3 pt-3">
            <h5 className="">
              Organization Details <span className="text-danger">*</span>
            </h5>
            <div>
              {note.digitalPayment.iswanted && (
                <PaymentSubForm updatePaymentSubform={updatePaymentData} />
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mb-3 p-3">
        <button className="btn btn-primary" onClick={submit}>
          Submit
        </button>
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
