import { useState, useEffect } from "react";
import React from "react";
import { useTranslation } from 'react-i18next';
import Header from "./Header";
import Axios from "axios";
import Note from "./Note";
import Form from "./Form";
import Form2 from "./Form2";

export default function App(props) {

  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  
  function handleClick(language){
    i18n.changeLanguage(language);
    document.body.lang = language;
    document.body.dir = i18n.dir();
  }


  const [data, setData] = useState({});
  // useEffect(() => {
  //   Axios.get("https://notekeep-backend.onrender.com/api/notes")
  //     .then((res) => {
  //       setData(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // });

  function saveData(note) {
    Axios.post("http://localhost:3001/api/notes", note).catch((err) =>
      console.log(err)
    );
  }

  // function deleteData(id) {
  //   Axios.delete("https://notekeep-backend.onrender.com/api/notes/" + id).catch(
  //     (err) => console.log(err)
  //   );
  // }

    function getOrgData(id) {
      let foundData;
      Axios.get("http://localhost:3001/api/notes/" + id)
      .then((res) => {
        foundData = res.data[0];
        setData(res.data[0]);
        console.log(res.data[0]);
        console.log(organization);
      })
      .catch(
        (err) => console.log(err)
      );

      return foundData;
    }
  
  var organization = {
    managerPhoneNumber: "0543257745",
    orgDetails: {
      organizationName: "",
      orgLogo: "",
      staff: [
        {
          position: "manager",
          name: "",
          phoneNumber: "",
          email: ""
        },
        {
          position: "secretary",
          name: "",
          phoneNumber: "",
          email: ""
        },
        {
          position: "security manager",
          name: "",
          phoneNumber: "",
          email: ""
        }
      ],
    },
    digitalPayment: {
      iswanted: false,
      details: {
        accountNumber: "",
        branchID: "",
        bankName: "",
      },
    },
    classes: {
      numberOfClasses: 1,
      classes: [{
        className: "",
        classLocation: "",
        staff: {
          teachers: [
            {
              name: "",
              phoneNumber: "",
            }
          ],
          assistants: [
            {
              name: "",
              phoneNumber: "",
            }
          ],
        },
        workDays: [false, false, false, false, false, false, false],
        startOfDay: "08:00",
        endOfDay: "13:30",
        longDay: {
          isLongDay: false,
          staff: {
            teachers: [{
              name: "",
              phoneNumber: "",
            }],
            assistants: [{
              name: "",
              phoneNumber: "",
            }],
          },
          startOfLongDayHours: "13:30",
          endOfLongDayHours: "15:00",
        },
      }],
    },
  };

  return (
    <div className="bg-light">
      <Header switchLanguage={handleClick} />

      {getOrgData("0543257745")}

      {/* <Form onsubmit={saveData} /> */}
      <Form2 t={t} onsubmit={saveData} org={organization} />
      {/* {data.map((item, index) => {
        return (
          <Note
            title={item.title}
            content={item.content}
            key={index}
            id={item._id}
            ondelete={deleteData}
          />
        );
      })} */}
    </div>
  );
}
