import React from "react";
import { useState } from "react";

export default function Assistants(props) {
  const [assistants, setAssistants] = useState(props.assistants);

  function updateAssistantName(event) {
    const { value, name } = event.target;
    let data = [...assistants];
    data[name].name = value;
    // props.setNote();
    setAssistants(data);
    props.updateAssistants(data);
  }
  function updateAssistantPhonenumber(event) {
    const { value, name } = event.target;
    let data = [...assistants];
    data[name].phoneNumber = value;
    // props.setNote();
    setAssistants(data);
    props.updateAssistants(data);
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
    props.updateAssistants([
      ...assistants,
      {
        name: "",
        phoneNumber: "",
      },
    ]);
  }
  function remove(index) {
    let data = [...assistants];
    data.splice(index, 1);
    setAssistants(data);
    props.updateAssistants(data);
  }

  return (
    <div className="container p-0">
      <p className="form-label"><strong>{props.t('Classes.11')}</strong></p>
      {arrayRange(1, assistants.length, 1).map((assistant, index) => {
        return (
          <ul className="list-group px-0">
            <li key={index} className="d-flex justify-content-between lh-sm">
              <div className="input-group mb-1" dir="ltr">
                <input
                  className="form-control bg-light"
                  onChange={updateAssistantName}
                  type="text"
                  name={index}
                  placeholder={props.t('Classes.8')}
                  autoComplete="off"
                  value={assistants[index].name}
                />
                <input
                  className="form-control bg-light"
                  onChange={updateAssistantPhonenumber}
                  type="text"
                  name={index}
                  placeholder={props.t('Classes.9')}
                  autoComplete="off"
                  value={assistants[index].phoneNumber}
                />
              </div>
              {/* <div className="mb-3 px-3">
                            <button className="btn btn-danger" onClick={() => remove(index)}>Delete</button>
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
      <div className="">
        <button className="btn btn-primary btn-sm" onClick={() => addAssistant()}>
        {props.t('Classes.12')}
        </button>
      </div>
    </div>
  );
}
