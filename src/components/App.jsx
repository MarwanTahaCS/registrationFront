import { useState, useEffect } from "react";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from "./Header";
import Axios from "axios";
import Reception from "./Reception";
import Form2 from "./Form2";
import SentPage from "./SentPage";

export default function App(props) {

  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();

  function handleClick(language) {
    i18n.changeLanguage(language);
    document.body.lang = language;
    document.body.dir = i18n.dir();
  }

  const [data, setData] = useState(null);
  const [managerPhoneNumber, setManagerPhoneNumber] = useState("");
  const [exists, setExists] = useState(false);

  useEffect(() => {
    if (managerPhoneNumber !== "") {
      Axios.get(localUrl + managerPhoneNumber)
        .then((res) => {
          let response = res.data;
          setData(response);
          if (response.length !== 0) {
            setExists(true);
          } else {
            setExists(false);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [managerPhoneNumber])

  // const localUrl = "http://localhost:3001/api/notes/";
  const localUrl = "https://admin.myvarno.io/api/notes/";

  function saveData(note) {
    console.log("in save data class")
    Axios.post(localUrl, note)
      .then((res) => {
        console.log(res);
      })
      .catch((err) =>
        console.log(err)
      );
  }

  function updateData(note) {
    console.log("in update class")
    Axios.post(`${localUrl}update`, note)
      .then((res) => {
        console.log(res);
      })
      .catch((err) =>
        console.log(err)
      );
  }

  // function deleteData(id) {
  //   Axios.delete("https://notekeep-backend.onrender.com/api/notes/" + id).catch(
  //     (err) => console.log(err)
  //   );
  // }

  // function getOrgData(id) {
  //   let foundData;
  //   Axios.get("http://localhost:3001/api/notes/" + id)
  //     .then((res) => {
  //       foundData = res.data;
  //       setData(res.data);
  //       console.log(res.data);
  //     })
  //     .catch(
  //       (err) => console.log(err)
  //     );

  //   return foundData;
  // }

  var organization = {
    managerPhoneNumber: "0543257745",
    orgDetails: {
      organizationName: "",
      orgLogo: "",
      logoID: "",
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
        classAgeGroup: "6-36-months",
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

  function getDefaultOrg() {
    let defaultOrg = organization;
    defaultOrg.managerPhoneNumber = managerPhoneNumber;
    return defaultOrg;
  }

  function getNewManagerPhoneNumber(newPhoneNumber) {
    setManagerPhoneNumber(newPhoneNumber);
  }

  return (
    <div className="bg-light">
      <Header switchLanguage={handleClick} />

      

      

      <Router>
        <Routes>
          <Route exact path="/" element={<div>
        {managerPhoneNumber === "" && (<Reception setManagerPhoneNumber={(newNumber) => getNewManagerPhoneNumber(newNumber)} t={t} />)}
        {data !== null && (<Form2 t={t} onsubmit={(!exists) ? saveData : updateData} org={(!exists) ? getDefaultOrg() : data[0]} />)}
      </div>} />
          <Route path="/success" element={<SentPage t={t} />} />
        </Routes>
      </Router>

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
