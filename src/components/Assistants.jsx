import React from "react";
import { useState } from "react";

export default function Assistants(props) {
  const [assistants, setAssistants] = useState([
    {
      name: "",
      phoneNumber: "",
    },
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
    setAssistants([
      ...assistants,
      {
        name: "",
        phoneNumber: "",
      },
    ]);
    props.updateAssistants(assistants);
  }
  function remove(index) {
    let data = [...assistants];
    data.splice(index, 1);
    setAssistants(data);
    props.updateAssistants(assistants);
  }

  return (
    <div className="container p-0">
      <p className="form-label">Assistants</p>
      {arrayRange(1, assistants.length, 1).map((assistant, index) => {
        return (
          <ul class="list-group ">
            <li key={index} class="d-flex justify-content-between lh-sm">
              <div className="input-group mb-1">
                <input
                  className="form-control bg-light"
                  onChange={updateAssistantName}
                  type="text"
                  name={index}
                  placeholder={"Full Name"}
                  autoComplete="off"
                  value={assistants[index].name}
                />
                <input
                  className="form-control bg-light"
                  onChange={updateAssistantPhonenumber}
                  type="text"
                  name={index}
                  placeholder={"Phone N. "}
                  autoComplete="off"
                  value={assistants[index].phoneNumber}
                />
              </div>
              {/* <div class="mb-3 px-3">
                            <button class="btn btn-danger" onClick={() => remove(index)}>Delete</button>
                        </div> */}
              <i
                className="material-icons"
                onClick={() => remove(index)}
                style={{ color: "red", fontSize: "36px" }}
              >
                delete
              </i>
            </li>
          </ul>
        );
      })}
      <div class="">
        <button class="btn btn-primary btn-sm" onClick={() => addAssistant()}>
          {" "}
          Add Assistant
        </button>
      </div>
    </div>
  );
}
