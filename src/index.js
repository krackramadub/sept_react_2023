import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App, { AppSecond } from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ChakraProvider>
      {/* BrowserRouter - обязательно используется для роутингов, им требуется обернуть весь проект */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </Provider>
);
// <React.StrictMode>
// </React.StrictMode>
