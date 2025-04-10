import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
// Redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./rutes/reducers";
// Services
import { storeService } from "./services/storeService";
const initialState = {
  user: {},
  opcion: "hola",
};

const currentStore = storeService.loadFromLocalStorage();
if (currentStore === undefined)
  localStorage.setItem("state", JSON.stringify(initialState));
const persistedState = storeService.loadFromLocalStorage();
const store = createStore(reducer, persistedState);

store.subscribe(() => storeService.saveToLocalStorage(store.getState()));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
