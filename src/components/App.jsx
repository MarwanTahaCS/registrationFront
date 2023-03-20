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


  const [data, setData] = useState([]);
  useEffect(() => {
    Axios.get("https://notekeep-backend.onrender.com/api/notes")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  });

  function saveData(note) {
    Axios.post("https://notekeep-backend.onrender.com/api/notes", note).catch((err) =>
      console.log(err)
    );
  }

  function deleteData(id) {
    Axios.delete("https://notekeep-backend.onrender.com/api/notes/" + id).catch(
      (err) => console.log(err)
    );
  }

  return (
    <div className="bg-light">
      <Header switchLanguage={handleClick} />

      {/* <Form onsubmit={saveData} /> */}
      <Form2 t={t} onsubmit={saveData} />
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
