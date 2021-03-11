import {App} from "./App";
import "./scss/index.scss";

(() => {
  const root = document.body.querySelector("#root");
  root.appendChild(new App());
})();
