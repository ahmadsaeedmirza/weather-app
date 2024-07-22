import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "../src/Style Sheets/index.css";
// import { Provider } from "./context/cityWeather.jsx";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

root.render(
  // <Provider>
    <App />
  // </Provider>
); 