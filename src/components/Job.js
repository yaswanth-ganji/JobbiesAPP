import React from "react";
import Header from "./Header";
import "../styles/Job.css";
import Searchfilter from "./Searchfilter";
import Searchresults from "./Searchresults";
import Cookie from "js-cookie";
import { Redirect } from "react-router-dom";
class Job extends React.Component {
  state = {
    searchResultData: [],
    Loader: true,
    salaryData: null,
    checkBoxData: [],
    searchBarData: "",
    ApiUrl: `https://apis.ccbp.in/jobs`,
    x: ``,
  };

  onSalaryData = (value) => {
    this.setState({ salaryData: value });
  };

  onCheckBoxData = (value) => {
    this.setState({ checkBoxData: value });
  };
  onSearchBarData = (value) => {
    this.setState({ searchBarData: value });
  };

  dynamicApi = () => {
    let ApiUrl = `https://apis.ccbp.in/jobs?`;
    console.log(this.state.salaryData);
    if (
      this.state.salaryData === null &&
      this.state.checkBoxData.length >= 1 &&
      this.state.checkBoxData
    ) {
      ApiUrl = `https://apis.ccbp.in/jobs?employment_type=${this.state.checkBoxData.join()}&search=${
        this.state.searchBarData
      }`;
    } else if (
      this.state.salaryData != null &&
      this.state.checkBoxData.length === 0
    ) {
      ApiUrl = `https://apis.ccbp.in/jobs?minimum_package=${this.state.salaryData}&search=${this.state.searchBarData}`;
    } else if (
      this.state.checkBoxData &&
      this.state.checkBoxData.length >= 1 &&
      this.state.salaryData != null
    ) {
      ApiUrl = `https://apis.ccbp.in/jobs?employment_type=${this.state.checkBoxData.join()}&minimum_package=${
        this.state.salaryData
      }&search=${this.state.searchBarData}`;
    } else if (
      this.state.salaryData === null &&
      this.state.checkBoxData &&
      this.state.checkBoxData.length === 0
    ) {
      ApiUrl = `https://apis.ccbp.in/jobs?&search=${this.state.searchBarData}`;
    }
    console.log(ApiUrl);
    const JwtToken = Cookie.get("JobbyjwtToken");
    let options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JwtToken}`,
      },
    };

    fetch(ApiUrl, options)
      .then((res) => {
        return res.json();
      })
      .then((jsonBody) => {
        this.setState({ searchResultData: jsonBody.jobs, Loader: false });
      })
      .catch((err) => {
        console.log("errorTriggerd", err);
      });
  };

  render() {
    const jwtToken = Cookie.get("JobbyjwtToken");
    if (jwtToken === undefined) {
      return <Redirect to="/login" />;
    }

    return (
      <>
        <Header />
        <div className="jobDiv">
          <div className="withApplyBtn">
            <Searchfilter
              salaryData={this.onSalaryData}
              checkBoxData={this.onCheckBoxData}
            />
            <button onClick={this.dynamicApi} className="applyBtn">
              Apply Filter
            </button>
          </div>
          <div className="jobResults">
            <Searchresults
              getDynamicData={this.dynamicApi}
              Loader={this.state.Loader}
              searchResultData={this.state.searchResultData}
              SearchBarData={this.onSearchBarData}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Job;
