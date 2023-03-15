import React from "react";
import { useState } from "react";

export default function Assistants(props) {
    const [assistants, setAssistants] = useState([
        {
            name: "",
            phoneNumber: ""
        }
    ]);

    function updateAssistantName(event) {
        const { value, name } = event.target;
        let data = [...assistants];
        data[name].name = value;
        // props.setNote();
        setAssistants(data);
        props.updateAssistants(assistants);
    }
    function updateAssistantPhonenumber(event) {
        const { value, name } = event.target;
        let data = [...assistants];
        data[name].phoneNumber = value;
        // props.setNote();
        setAssistants(data);
        props.updateAssistants(assistants);
    }
    const arrayRange = (start, stop, step) =>
        Array.from(
            { length: (stop - start) / step + 1 },
            (value, index) => start + index * step
        );

    function addAssistant() {
        setAssistants([...assistants, {
            name: "",
            phoneNumber: ""
        }]);
        props.updateAssistants(assistants);
    }
    function remove(index) {
        let data = [...assistants];
        data.splice(index, 1);
        setAssistants(data);
        props.updateAssistants(assistants);
    }

    return (
        <div className="container">
            <p className="form-label">Assistants</p>
            {arrayRange(1, assistants.length, 1).map((assistant, index) => {
                return <ul class="list-group mb-3">
                    <li key={index} class="d-flex justify-content-between lh-sm">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Name</span><input
                                className="form-control bg-light"
                                onChange={updateAssistantName}
                                type="text"
                                name={index}
                                placeholder={"Assistant name " + `${index + 1}`}
                                autoComplete="off"
                                value={assistants[index].name}
                            /></div>
                        <div class=""></div>
                        <div class="input-group mb-3 px-3">
                            <span class="input-group-text" id="basic-addon1">Phone N.</span>
                            <input
                                className="form-control bg-light"
                                onChange={updateAssistantPhonenumber}
                                type="text"
                                name={index}
                                placeholder={"Assistant Phone number " + `${index + 1}`}
                                autoComplete="off"
                                value={assistants[index].phoneNumber}
                            />
                        </div>
                        <div class="mb-3 px-3">
                            <button class="btn btn-danger" onClick={() => remove(index)}>Delete</button>
                        </div>
                    </li>
                </ul>;
            })}
            <div class="">
                <button class="btn btn-primary" onClick={() => addAssistant()}> Add Assistant</button>
            </div>
        </div>
    );
}