import React from "react";
import ReactDOM from "react-dom";
import Main from "./Components/Main";
import * as serviceWorker from "./serviceWorker";

import "./styles.css";

function App() {
  return <Main />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

serviceWorker.register();
