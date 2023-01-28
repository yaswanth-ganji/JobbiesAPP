import React from "react";
import "../styles/login.css";
import Cookie from "js-cookie";
import { Redirect } from "react-router-dom";
class Login extends React.Component {
  state = {
    username: "",
    password: "",
    error: false,
    errorMsg: "",
  };
  onUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  };
  onPasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };
  onFormSubmit = (e) => {
    e.preventDefault();
    this.Apicalling();
  };
  Apicalling = async () => {
    const { username } = this.state;
    const { password } = this.state;
    var userDetails = { username, password };
    let options = {
      method: "POST",
      header: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userDetails),
    };

    const res = await fetch("https://apis.ccbp.in/login", options);
    const jsonBody = await res.json();
    console.log(jsonBody);

    if (res.ok === true) {
      Cookie.set("JobbyjwtToken", jsonBody.jwt_token, { expires: 30 });
      this.setState({ error: false });
      const { history } = this.props;
      history.replace("/");
    } else {
      this.setState({ errorMsg: jsonBody.error_msg, error: true });
    }
  };
  render() {
    const jwtToken = Cookie.get("JobbyjwtToken");
    if (jwtToken !== undefined) {
      return <Redirect to="/" />;
    }
    return (
      <div className="loginBody">
        <form className="loginForm" onSubmit={this.onFormSubmit}>
          <div className="loginDiv">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              width={100}
              height={35}
              alt="appLogo"
            />

            <input
              placeholder="User Name"
              type="text"
              is="userinp"
              onChange={this.onUsernameChange}
            />

            <input
              id="passinp"
              placeholder="Password"
              type="password"
              onChange={this.onPasswordChange}
            />
            <button>Login</button>
            {this.state.error && (
              <p className="errMsg">***{this.state.errorMsg}</p>
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
