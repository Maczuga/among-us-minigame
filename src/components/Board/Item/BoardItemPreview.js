import {BoardItem} from "./BoardItem";
import "./BoardItemPreview.scss";
import {settings} from "../../../settings";
import {strToBool} from "../../../lib";

export class BoardItemPreview extends BoardItem {
  get highlight() {
    return strToBool(this.getAttribute("highlight"));
  }

  set highlight(val) {
    this.setAttribute("highlight", val);
  }

  static get observedAttributes() { return ["highlight"]; }
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "highlight":
      {
        const boolVal = strToBool(newValue);
        this.classList.toggle("highlight", boolVal);
        if (boolVal === true) {
          setTimeout(() => {
            this.highlight = false;
          }, settings.HIGHLIGHT_DELAY_MS);
        }
        break;
      }
    }
  }
}

BoardItemPreview.componentName = `${BoardItem.componentName}-preview`;
customElements.define(BoardItemPreview.componentName, BoardItemPreview);
