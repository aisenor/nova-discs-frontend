import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="icon" type="image/svg+xml" href="%PUBLIC_URL%/favicon.svg"/>
            <title>NovaDiscs</title>
        </head>
        <App/>
    </React.StrictMode>
);

reportWebVitals();