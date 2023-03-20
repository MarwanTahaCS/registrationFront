import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";

import "./i18next";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Suspense fallback={(<div>Loading...</div>)}>
      <App/>
    </Suspense>
  </React.StrictMode>
);

// function setAttribute(language,dir){
//   document.getElementsByTagName('html')[0].setAttribute("lang", language);
//   document.getElementsByTagName('html')[0].setAttribute("dir", dir);
// }

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
