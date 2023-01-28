import React from "react";
import ReactDom from "react-dom";
import Jobby from "./components/Jobby";
import { BrowserView, MobileView } from "react-device-detect";
import "./components/Mobileview.css";
// import Screensize from "./Screensize";
class App extends React.Component {
  render() {
    return (
      <>
        <BrowserView>
          <Jobby />
        </BrowserView>
        <MobileView>
          <div className="MobileView">
            <h1>Oops..,</h1>
            <h2>This Application is only available for Desktop Users</h2>
          </div>
        </MobileView>
      </>
    );
  }
}
ReactDom.render(<App />, document.getElementById("root"));
