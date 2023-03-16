import React from "react";
import { useState } from "react";

export default function PaymentSubForm(props) {
  const [paymentData, setPaymentData] = useState({
    accountNumber: "",
    branchID: "",
    bankName: "",
  });

  function updatePaymentData(event) {
    const { value, name } = event.target;
    setPaymentData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
    props.updatePaymentSubform(paymentData);
  }

  return (
    <div className=" py-3">
      <div className="input-group pb-3">
        <span className="input-group-text">
          Account Number
        </span>
        <input
          type="text"
          name={"accountNumber"}
          value={paymentData.accountNumber}
          onChange={updatePaymentData}
          placeholder="Account Number"
          className="form-control"
        />
      </div>
      <div className="input-group pb-3">
        <span className="input-group-text">
          Branch ID
        </span>
        <input
          type="text"
          name="branchID"
          value={paymentData.branchID}
          onChange={updatePaymentData}
          placeholder="Bank Branch Number"
          className="form-control"
        />
      </div>
      <div className="input-group">
        <span className="input-group-text">
          Bank Name
        </span>
        <input
          type="text"
          name="bankName"
          value={paymentData.bankName}
          onChange={updatePaymentData}
          placeholder="Bank Name"
          className="form-control"
        />
      </div>
    </div>
  );
}
