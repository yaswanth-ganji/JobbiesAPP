import React from "react";
import "../styles/NotFound.css";
class NotFound extends React.Component {
  render() {
    return (
      <div className="NotFoundDiv">
        <img
          src={
            "https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
          }
          alt="notFoundPageImg"
        />

        <p>Page Not Found</p>
        <span>we are sorry, the page you requested could not be found...</span>
      </div>
    );
  }
}

export default NotFound;
