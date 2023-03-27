import React, { useState } from "react";

export default function Reception(props) {
    const [managerPhoneNumber, setManagerPhoneNumber] =
        useState("");

    function changeNumber(event) {
        setManagerPhoneNumber(event.target.value);
    }

    function updateNewNumber() {
        props.setManagerPhoneNumber(managerPhoneNumber);
    }

    return (
        <div className="container py-3">
            <div className="card m-3">
                <h5 className="p-3">
                    {props.t("Reception.1")}
                </h5>

                <div className=" px-3 pb-3 ">
                    <input className="form-control" onChange={changeNumber} value={managerPhoneNumber} type="text" placeholder={`${props.t("Reception.2")}`}></input>


                </div>
                <div className="px-3 pb-3" >
                    <button className="btn btn-primary" onClick={updateNewNumber}>{props.t("Reception.3")}</button>
                </div>

            </div>
        </div>
    );
}
