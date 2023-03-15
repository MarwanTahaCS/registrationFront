import React from "react";
import { useState } from "react";

export default function Teachers(props) {
    const [teachers, setTeachers] = useState([
        {
            name: "",
            phoneNumber: ""
        }
    ]);

    function updateTeacherName(event) {
        const { value, name } = event.target;
        let data = [...teachers];
        data[name].name = value;
        // props.setNote();
        setTeachers(data);
        props.updateTeachers(teachers);
    }
    function updateTeacherPhonenumber(event) {
        const { value, name } = event.target;
        let data = [...teachers];
        data[name].phoneNumber = value;
        // props.setNote();
        setTeachers(data);
        props.updateTeachers(teachers);
    }
    const arrayRange = (start, stop, step) =>
        Array.from(
            { length: (stop - start) / step + 1 },
            (value, index) => start + index * step
        );

    function addTeacher() {
        setTeachers([...teachers, {
            name: "",
            phoneNumber: ""
        }]);
        props.updateTeachers(teachers);
    }
    function remove(index){
        let data = [...teachers];
        data.splice(index,1);
        // props.setNote();
        setTeachers(data);
        props.updateTeachers(teachers);
    }

    return (
        <div className="container">
            <p className="form-label">Teachers</p>
            {arrayRange(1, teachers.length, 1).map((teacher, index) => {
                return <ul class="list-group mb-3">
                    <li key={index} class="d-flex justify-content-between lh-sm">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Name</span>
                            <input
                                className="form-control bg-light"
                                onChange={updateTeacherName}
                                type="text"
                                name={index}
                                placeholder={`Teacher name ${index + 1}`}
                                autoComplete="off"
                                value={teachers[index].name}
                            />
                        </div>
                        <div class="input-group mb-3 px-3">
                            <span class="input-group-text" id="basic-addon1">Phone N.</span>
                            <input
                                className="form-control bg-light"
                                onChange={updateTeacherPhonenumber}
                                type="text"
                                name={index}
                                placeholder={"Teacher Phone number " + `${index + 1}`}
                                autoComplete="off"
                                value={teachers[index].phoneNumber}
                            />
                        </div>
                        <div class="mb-3 px-3">
                            <button class="btn btn-danger" onClick={() => remove(index)}>Delete</button>
                        </div>
                    </li>
                </ul>;
            })}
            <div class="">
                <button class="btn btn-primary" onClick={() => addTeacher()}> Add Teacher</button>
            </div>
        </div>
    );
}