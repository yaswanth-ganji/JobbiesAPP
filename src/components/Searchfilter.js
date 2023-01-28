import React from "react";
import "../styles/Job.css";
import Profile from "./profile";

class Searchfilter extends React.Component {
  state = {
    EmpType: [],
  };
  onInputChange = (e) => {
    this.props.salaryData(e.target.value);
  };
  onCheckBoxChange = (e) => {
    if (e.target.checked) {
      this.state.EmpType.push(e.target.value);
    } else {
      this.state.EmpType.splice(this.state.EmpType.indexOf(e.target.value), 1);
    }
    this.props.checkBoxData(this.state.EmpType);
  };

  render() {
    return (
      <>
        <div className="jobFilter">
          <div className="jobFilter1">
            <Profile />

            <div className="EmpTypes">
              <b>Type of Employments</b>
              <div>
                <input
                  type="checkbox"
                  id="FULLTIME"
                  value="FULLTIME"
                  onChange={this.onCheckBoxChange}
                />
                <label htmlFor="FULLTIME">Full Time</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="PARTTIME"
                  value="PARTTIME"
                  onChange={this.onCheckBoxChange}
                />
                <label htmlFor="PARTTIME">Part Time</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="FREELANCE"
                  value="FREELANCE"
                  onChange={this.onCheckBoxChange}
                />
                <label htmlFor="FREELANCE">Frelance</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="INTERNSHIP"
                  value="INTERNSHIP"
                  onChange={this.onCheckBoxChange}
                />
                <label htmlFor="INTERNSHIP">Internship</label>
              </div>
            </div>

            <div className="salaryDetails">
              <b>Salary Range</b>
              <div>
                <input
                  type="radio"
                  name="same"
                  value="1000000"
                  id="10LPA"
                  onChange={this.onInputChange}
                />
                <label htmlFor="10LPA">10 LPA and above</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="same"
                  value="2000000"
                  id="20LPA"
                  onChange={this.onInputChange}
                />
                <label htmlFor="20LPA">20 LPA and above</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="same"
                  value="3000000"
                  id="30LPA"
                  onChange={this.onInputChange}
                />
                <label htmlFor="30LPA">30 LPA and above</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="same"
                  value="4000000"
                  id="40LPA"
                  onChange={this.onInputChange}
                />
                <label htmlFor="40LPA">40 LPA and above</label>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Searchfilter;
