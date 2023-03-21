import React from "react";
import { useState } from "react";

export default function Teachers(props) {
  const [teachers, setTeachers] = useState(props.teachers);

  function updateTeacherName(event) {
    const { value, name } = event.target;
    let data = [...teachers];
    data[name].name = value;
    // props.setNote();
    setTeachers(data);
    props.updateTeachers(data);
  }
  function updateTeacherPhonenumber(event) {
    const { value, name } = event.target;
    let data = [...teachers];
    data[name].phoneNumber = value;
    // props.setNote();
    setTeachers(data);
    props.updateTeachers(data);
  }
  const arrayRange = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (value, index) => start + index * step
    );

  function addTeacher() {
    setTeachers([
      ...teachers,
      {
        name: "",
        phoneNumber: "",
      },
    ]);
    props.updateTeachers([
      ...teachers,
      {
        name: "",
        phoneNumber: "",
      },
    ]);
  }
  function remove(index) {
    let data = [...teachers];
    data.splice(index, 1);
    // props.setNote();
    setTeachers(data);
    props.updateTeachers(data);
  }

  return (
    <div className="container p-0">
      <p className="form-label"><strong>{props.t('Classes.7')}</strong></p>
      {arrayRange(1, teachers.length, 1).map((teacher, index) => {
        return (
          <ul className="list-group px-0">
            <li key={index} className="d-flex justify-content-between lh-sm" >
              <div className="input-group mb-1" dir="ltr">
                {/* <span className="input-group-text" id="basic-addon1">{index}</span> */}
                <input
                  className="form-control bg-light"
                  onChange={updateTeacherName}
                  type="text"
                  name={index}
                  placeholder={props.t('Classes.8')}
                  autoComplete="off"
                  value={teachers[index].name}
                />
                <input
                  className="form-control bg-light"
                  onChange={updateTeacherPhonenumber}
                  type="text"
                  name={index}
                  placeholder={props.t('Classes.9')}
                  autoComplete="off"
                  value={teachers[index].phoneNumber}
                />
              </div>

              {/* <div className="input-group mb-3 px-3">
                            <span className="input-group-text" id="basic-addon1">Phone N.</span>
                            <input
                                className="form-control bg-light"
                                onChange={updateTeacherPhonenumber}
                                type="text"
                                name={index}
                                placeholder={"Teacher Phone number " + `${index + 1}`}
                                autoComplete="off"
                                value={teachers[index].phoneNumber}
                            />
                        </div> */}
              <div className="">
                {/* <button className="btn btn-danger btn-sm" onClick={() => remove(index)}>
                  Delete
                </button> */}
                <i className="material-icons" onClick={() => remove(index)} style={{color: "red", fontSize:"36px"}}>delete</i>
              </div>
            </li>
          </ul>
        );
      })}
      <div className="">
        <button className="btn btn-primary btn-sm" onClick={() => addTeacher()}>
          {props.t('Classes.10')}
        </button>
      </div>
    </div>
  );
}
