import React from "react";
import Header from "./Header";
import "../styles/Job.css";
import Searchfilter from "./Searchfilter";
import Searchresults from "./Searchresults";
import Cookie from "js-cookie";
import { Redirect } from "react-router-dom";
import Pagination from "./Pagination";
//just
class Job extends React.Component {
  state = {
    searchResultData: [],
    searchResultDataPerPage: [],
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
        this.setState({
          searchResultData: jsonBody.jobs,
          searchResultDataPerPage: jsonBody.jobs.slice(0, 5),
          Loader: false,
        });
      })
      .catch((err) => {
        console.log("errorTriggerd", err);
      });
  };

  pageHandler = (pageNumber) => {
    this.setState({
      searchResultDataPerPage: this.state.searchResultData.slice(
        pageNumber * 5 - 5,
        pageNumber * 5
      ),
    });
  };
  render() {
    const jwtToken = Cookie.get("JobbyjwtToken");
    if (jwtToken === undefined) {
      return <Redirect to="/login" />;
    }

    return (
      <div style={{ height: "100vh", background: "#000000" }}>
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
              searchResultData={this.state.searchResultDataPerPage}
              SearchBarData={this.onSearchBarData}
            />
            {!this.state.Loader && (
              <Pagination
                searchResultData={this.state.searchResultData}
                pageHandler={this.pageHandler}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Job;
