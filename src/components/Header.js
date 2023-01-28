import React from "react";
import { Link, withRouter } from "react-router-dom";
import "../styles/Header.css";
import Cookie from "js-cookie";

class Header extends React.Component {
  logOut = () => {
    Cookie.remove("JobbyjwtToken");
    const { history } = this.props;
    history.replace("/login");
  };
  Home = () => {
    const { history } = this.props;
    history.push("/");
  };
  render() {
    return (
      <>
        <div className="headerDiv">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            width={100}
            height={35}
            onClick={this.Home}
            className="appLogo"
            alt="appLogo"
          />
          <div className="spanDiv">
            <Link to="/">
              <span>Home</span>
            </Link>
            <Link to="/Jobs">
              <span>Jobs</span>
            </Link>
          </div>
          <button onClick={this.logOut}>Logout</button>
        </div>
      </>
    );
  }
}

export default withRouter(Header);
