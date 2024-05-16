import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Routee from "./Routee";
import reportWebVitals from "./reportWebVitals";
import { Provider } from 'react-redux';
import store from './reducers/store';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routee />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
