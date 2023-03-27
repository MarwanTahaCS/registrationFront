import React from "react";
import { useState } from "react";

export default function PaymentSubForm(props) {
  const [paymentData, setPaymentData] = useState(props.paymentDetails);

  function updatePaymentData(event) {
    const { value, name } = event.target;
    setPaymentData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
    props.updatePaymentSubform({
      ...paymentData,
      [name]: value,
    });
  }

  return (
    <div className=" py-3">
      <div className="input-group pb-3" dir="ltr">
        <span className="input-group-text">
        {props.t('PaymentDetails.2')}
        </span>
        <input
          type="text"
          name={"accountNumber"}
          value={paymentData.accountNumber}
          onChange={updatePaymentData}
          placeholder={props.t('PaymentDetails.3')}
          className="form-control"
        />
      </div>
      <div className="input-group pb-3" dir="ltr">
        <span className="input-group-text">
        {props.t('PaymentDetails.4')}
        </span>
        <input
          type="text"
          name="branchID"
          value={paymentData.branchID}
          onChange={updatePaymentData}
          placeholder={props.t('PaymentDetails.5')}
          className="form-control"
        />
      </div>
      <div className="input-group" dir="ltr">
        <span className="input-group-text">
        {props.t('PaymentDetails.6')}
        </span>
        <input
          type="text"
          name="bankName"
          value={paymentData.bankName}
          onChange={updatePaymentData}
          placeholder={props.t('PaymentDetails.7')}
          className="form-control"
        />
      </div>
    </div>
  );
}
