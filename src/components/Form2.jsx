import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import OrgDetails from "./OrgDetails";
import Teachers from "./Teachers";
import Assistants from "./Assistants";
import LongDay from "./LongDay";
import PaymentSubForm from "./PaymentSubForm";

export default function Form2(props) {
  const [note, setNote] = useState(props.org);

  function updateOrgDetails(newOrgDetails) {
    setNote((prevValue) => {
      return {
        ...prevValue,
        orgDetails: newOrgDetails,
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
        classes: newClasses,
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
        classes: newClasses,
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
        teachers: [
          {
            name: "",
            phoneNumber: "",
          },
        ],
        assistants: [
          {
            name: "",
            phoneNumber: "",
          },
        ],
      },
      workDays: [false, false, false, false, false, false, false],
      startOfDay: "08:00",
      endOfDay: "13:30",
      longDay: {
        isLongDay: false,
        staff: {
          teachers: [
            {
              name: "",
              phoneNumber: "",
            },
          ],
          assistants: [
            {
              name: "",
              phoneNumber: "",
            },
          ],
        },
        startOfLongDayHours: "13:30",
        endOfLongDayHours: "15:00",
      },
    });
    setNote((prevValue) => {
      return {
        ...prevValue,
        classes: newClasses,
      };
    });
  }

  function updateTeachers(teachers, classIndex) {
    let classes = note.classes;
    classes.classes[classIndex].staff.teachers = [...teachers];
    setNote((prevValue) => {
      return {
        ...prevValue,
        classes: classes,
      };
    });
  }

  function updateAssistants(assistants, classIndex) {
    let classes = note.classes;
    classes.classes[classIndex].staff.assistants = [...assistants];
    setNote((prevValue) => {
      return {
        ...prevValue,
        classes: classes,
      };
    });
  }

  function updateLongDay(longDayData, classIndex) {
    let classes = note.classes;
    classes.classes[classIndex].longDay = {
      ...classes.classes[classIndex].longDay,
      staff: longDayData.staff,
      startOfLongDayHours: longDayData.startOfLongDayHours,
      endOfLongDayHours: longDayData.endOfLongDayHours,
    };
    setNote((prevValue) => {
      return {
        ...prevValue,
        classes: classes,
      };
    });
  }

  function updatePaymentData(paymentData) {
    let newForm = note.digitalPayment;
    newForm = {
      ...newForm,
      details: paymentData,
    };
    setNote((prevValue) => {
      return {
        ...prevValue,
        digitalPayment: newForm,
      };
    });
  }

  function submit() {
    props.onsubmit(note);
    console.log(note);
    toast.success(props.t("Form.1"), {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    // console.log(note);
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
        classes: classes,
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
        classes: newClasses,
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
        classes: newClasses,
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
        classes: newClasses,
      };
    });
  }

  function digitalPaymentStatus() {
    let form = note;
    form.digitalPayment.iswanted = form.digitalPayment.iswanted ? false : true;
    setNote(() => {
      return {
        ...form,
      };
    });
  }

  function updateClassAgeGroup(event, index){
    const value = event.target.value;

    console.log(value, index);
  }

  function remove(index) {
    let data = note.classes;
    data.classes.splice(index, 1);
    // props.setNote();
    setNote((prevValue) => {
      return {
        ...prevValue,
        classes: data
      };
    });
  }

  return (
    <div className="container py-3">
      <div className="card m-3">
        <h2 className="pt-3 px-3">
          <strong>{props.t("Intro.1")}</strong>
        </h2>
        <p className="px-4 mb-1">{props.t("Intro.2")}</p>
        <p className="px-4 mb-1">{props.t('Intro.4')}</p>
        <p className="px-4 text-danger">* {props.t("Intro.3")}</p>
      </div>

      <div className="mb-3 p-3">
        <button className="btn btn-primary" onClick={submit}>
          {props.t("Form.2")}
        </button>
      </div>

      <OrgDetails
        phoneNumber={note.managerPhoneNumber}
        t={props.t}
        updateOrgDetails={(newOrgDetails) => {
          updateOrgDetails(newOrgDetails);
        }}
        orgDetails={note.orgDetails}
        digitalPaymentStatus={digitalPaymentStatus}
      />

      <div className="card m-3">
        <div className="p-3">
          <h5 className="">
            {props.t("Classes.1")} <span className="text-danger">*</span>
          </h5>
          {note.numberOfClasses !== 0 &&
            arrayRange(1, note.classes.classes.length, 1).map(
              (currentValue, index) => {
                return (
                  <ul className="list-group m-1 mx-0 px-0 my-4">
                    <div className="accordion" id="accordionExample">
                      <div className="accordion-item">
                        <h2
                          className="accordion-header bg-light"
                          id="headingOne"
                          dir="ltr"
                        >
                          <button
                            className="accordion-button bg-light py-0 ps-0"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapseOne${index}`}
                            aria-expanded="true"
                            aria-controls={`collapseOne${index}`}
                          >
                            <div className=" p-0 m-0"><i className="material-icons py-3 px-2" onClick={() => remove(index)} style={{ color: "red", fontSize: "36px" }}>delete</i></div>
                            <h6 className="p-3">
                              {note.classes.classes[index].className === ""
                                ? `${props.t("Classes.2")} ${index + 1}`
                                : note.classes.classes[index].className}
                            </h6>


                          </button>

                        </h2>
                        <div
                          id={`collapseOne${index}`}
                          className="accordion-collapse collapse show"
                          aria-labelledby={`headingOne${index}`}
                          data-bs-parent={`#accordionExample${index}`}
                        >
                          <div className="accordion-body">
                            <div
                              key={index}
                              className="my-4 d-flex justify-content-between lh-sm "
                              dir="ltr"
                            >
                              <div className="col">
                                <div className="row py-2">
                                  <div className="input-group">
                                    <span
                                      className="input-group-text"
                                      id="basic-addon1"
                                    >
                                      {props.t("Classes.3")}
                                    </span>
                                    <input
                                      className="form-control"
                                      onChange={updateClassName}
                                      type="text"
                                      name={`${index}`}
                                      placeholder={props.t("Classes.4")}
                                      autoComplete="off"
                                      value={
                                        note.classes.classes[index].className
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="row py-2">
                                  <div className="input-group">
                                    <span
                                      className="input-group-text"
                                      id="basic-addon1"
                                    >
                                      {props.t("Classes.5")}
                                    </span>
                                    <input
                                      className="form-control"
                                      onChange={updateClassLocation}
                                      type="text"
                                      name={`${index}`}
                                      placeholder={props.t("Classes.6")}
                                      autoComplete="off"
                                      value={
                                        note.classes.classes[index]
                                          .classLocation
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="my-4  ">
                              <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">{props.t("Classes.26")}</FormLabel>
                                <RadioGroup
                                  aria-labelledby="demo-radio-buttons-group-label"
                                  defaultValue="r1"
                                  onChange={(event) => updateClassAgeGroup(event, index)}
                                  name="radio-buttons-group"
                                >
                                  <FormControlLabel value="r1" control={<Radio />} label={`6-36 ${props.t("Classes.27")}`} />
                                  <FormControlLabel value="r2" control={<Radio />} label={`3 ${props.t("Classes.28")}`} />
                                  <FormControlLabel value="r3" control={<Radio />} label={`4 ${props.t("Classes.28")}`} />
                                  <FormControlLabel value="r4" control={<Radio />} label={`5 ${props.t("Classes.28")}`} />
                                  <FormControlLabel value="r5" control={<Radio />} label={props.t("Classes.29")} />
                                </RadioGroup>
                              </FormControl>
                              {/* <div className="row">
                                <div className="col col-12 col-sm-6 col-md-4 col-xl-3">
                                  <p className="input-group-text">
                                    {props.t("Classes.26")}
                                  </p>
                                </div>
                                <div className="col col-12 col-sm-6 col-md-8 col-xl-9">
                                  <div class="btn-group-vertical " role="group" aria-label="Basic radio toggle button group" dir="ltr">
                                    <input type="radio" class="btn-check" name="btnradio" id="r1" autocomplete="off" />
                                    <label class="btn btn-outline-secondary" for="r1">{`6-36 ${props.t("Classes.27")}`}</label>

                                    <input type="radio" class="btn-check" name="btnradio" id="r2" autocomplete="off" />
                                    <label class="btn btn-outline-secondary" for="r2">{`3 ${props.t("Classes.28")}`}</label>

                                    <input type="radio" class="btn-check" name="btnradio" id="r3" autocomplete="off" />
                                    <label class="btn btn-outline-secondary" for="r3">{`4 ${props.t("Classes.28")}`}</label>

                                    <input type="radio" class="btn-check" name="btnradio" id="r4" autocomplete="off" />
                                    <label class="btn btn-outline-secondary" for="r4">{`5 ${props.t("Classes.28")}`}</label>

                                    <input type="radio" class="btn-check" name="btnradio" id="r5" autocomplete="off" />
                                    <label class="btn btn-outline-secondary" for="r5">{props.t("Classes.29")}</label>
                                  </div>
                                </div>
                              </div> */}
                            </div>

                            <div className="my-4 d-flex justify-content-between lh-sm">
                              <Teachers
                                updateTeachers={(teachers) =>
                                  updateTeachers(teachers, index)
                                }
                                t={props.t}
                                teachers={
                                  note.classes.classes[index].staff.teachers
                                }
                              />
                            </div>
                            <div className="my-4 d-flex justify-content-between lh-sm">
                              <Assistants
                                updateAssistants={(assistants) =>
                                  updateAssistants(assistants, index)
                                }
                                t={props.t}
                                assistants={
                                  note.classes.classes[index].staff.assistants
                                }
                              />
                            </div>

                            <div className="my-4  text-center">
                              <div className="row g-1 g-md-2">
                                <div className="col-12 ">
                                  <span
                                    className="input-group-text  "
                                    id="basic-addon1"
                                  >
                                    {props.t("Classes.13")}
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
                                        {props.t("Classes.14")}
                                      </button>
                                      <button
                                        className="btn btn-sm col"
                                        onClick={(e) => {
                                          handleClick(e, 1, index);
                                        }}
                                        type="button"
                                      >
                                        {props.t("Classes.15")}
                                      </button>
                                      <button
                                        className="btn btn-sm col"
                                        onClick={(e) => {
                                          handleClick(e, 2, index);
                                        }}
                                        type="button"
                                      >
                                        {props.t("Classes.16")}
                                      </button>
                                      <button
                                        className="btn btn-sm col"
                                        onClick={(e) => {
                                          handleClick(e, 3, index);
                                        }}
                                        type="button"
                                      >
                                        {props.t("Classes.17")}
                                      </button>
                                      <button
                                        className="btn btn-sm col"
                                        onClick={(e) => {
                                          handleClick(e, 4, index);
                                        }}
                                        type="button"
                                      >
                                        {props.t("Classes.18")}
                                      </button>
                                      <button
                                        className="btn btn-sm col"
                                        onClick={(e) => {
                                          handleClick(e, 5, index);
                                        }}
                                        type="button"
                                      >
                                        {props.t("Classes.19")}
                                      </button>
                                      <button
                                        className="btn btn-sm col"
                                        onClick={(e) => {
                                          handleClick(e, 6, index);
                                        }}
                                        type="button"
                                      >
                                        {props.t("Classes.20")}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="my-4  justify-content-between lh-sm text-center">
                              <div className="row">
                                <div className="col col-12 col-sm-6 col-md-4 col-xl-3">
                                  <span className="input-group-text">
                                    {props.t("Classes.21")}
                                  </span>
                                </div>
                                <div className="col col-12 col-sm-6 col-md-8 col-xl-9">
                                  <div className="input-group" dir="ltr">
                                    <input
                                      type="text"
                                      name={`${index}`}
                                      value={
                                        note.classes.classes[index].startOfDay
                                      }
                                      onChange={updateStartOfWorkDay}
                                      placeholder="Start of work day"
                                      className="form-control"
                                    />
                                    <input
                                      type="text"
                                      name={`${index}`}
                                      value={
                                        note.classes.classes[index].endOfDay
                                      }
                                      onChange={updateEndOfWorkDay}
                                      placeholder="End of work day"
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="my-4  col">
                              <div className="form-check" dir="ltr">
                                <input
                                  name={`${index}`}
                                  onChange={longDayStatus}
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id={`defaultCheck1 ${index}`}
                                />
                                <label
                                  className="form-check-label"
                                  for={`defaultCheck1 ${index}`}
                                >
                                  {note.classes.classes[index].className === ""
                                    ? props.t("Classes.23")
                                    : note.classes.classes[index]
                                      .className}{" "}
                                  {props.t("Classes.24")}
                                </label>
                              </div>
                              <div className="row">
                                {note.classes.classes[index].longDay
                                  .isLongDay && (
                                    <LongDay
                                      updateLongDay={(longDayData) =>
                                        updateLongDay(longDayData, index)
                                      }
                                      t={props.t}
                                      longDayDetails={
                                        note.classes.classes[index].longDay
                                      }
                                    />
                                  )}
                              </div>
                            </div>
                          </div>
                        </div>
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
            {props.t("Classes.25")}
          </button>
        </div>
      </div>

      {note.digitalPayment.iswanted && (
        <div className="card m-3">
          <div className="px-3 pt-3">
            <h5 className="">
              {props.t("PaymentDetails.1")}{" "}
              <span className="text-danger">*</span>
            </h5>
            <div className="row">
              <PaymentSubForm
                updatePaymentSubform={updatePaymentData}
                t={props.t}
                paymentDetails={note.digitalPayment.details}
              />
            </div>
          </div>
        </div>
      )}

      <div className="mb-3 p-3">
        <button className="btn btn-primary" onClick={submit}>
          {props.t("Form.2")}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}
