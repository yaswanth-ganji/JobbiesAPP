import React from "react";
import Header from "./Header";
import "../styles/Home.css";
import Cookie from "js-cookie";
import { Redirect } from "react-router-dom";
class Home extends React.Component {
  findJob = () => {
    const { history } = this.props;
    history.push("/jobs");
  };
  render() {
    const jwtToken = Cookie.get("JobbyjwtToken");
    if (jwtToken === undefined) {
      return <Redirect to="/login" />;
    }

    return (
      <>
        <div className="homeDiv">
          <Header />
          <div className="homeContent">
            <p className="p1">Find The Job Thats Fits Your Life</p>
            <p className="p2">
              Millions of people are searching for jobs, salary, information and
              company reviews. Find the job that fits your abilites and
              potential
            </p>
            <button onClick={this.findJob}>Find Jobs</button>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
