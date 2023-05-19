import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import Router from "./routes";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";
import "./styles/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import "./styles/globals.css";
import "react-quill/dist/quill.snow.css";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.Fragment>
    <Provider store={store}>
      <ToastContainer
        autoClose={2000}
        theme="colored"
        draggablePercent={60}
        closeOnClick
      />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>
  </React.Fragment>
);
