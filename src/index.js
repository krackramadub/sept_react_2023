import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App, { AppSecond } from "./App";
import { MyContext, customData } from "./hooks/context";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MyContext.Provider value={customData}>
    {/* BrowserRouter - обязательно используется для роутингов, им требуется обернуть весь проект */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MyContext.Provider>
);
// <React.StrictMode>
// </React.StrictMode>
