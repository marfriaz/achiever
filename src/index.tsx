import React from "react";
import ReactDOM from "react-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlus,
  faChevronLeft,
  faTrashAlt,
  faCheckDouble,
  faQuoteLeft,
  faQuoteRight,
} from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App/App";

import reportWebVitals from "./reportWebVitals";

library.add(
  faPlus,
  faChevronLeft,
  faTrashAlt,
  faCheckDouble,
  faQuoteLeft,
  faQuoteRight
);

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
