import React from "react";
import Header from "./Header";
import Cookie from "js-cookie";
import "../styles/searchItemResultDetail.css";
import Searchresultitem from "./Searchresultitem";
import SimilarjobItem from "./similarJobItem";
import { Redirect } from "react-router-dom";
import Arrow from "../styles/arrow.png";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
class SearchResultItemDetail extends React.Component {
  state = {
    ResultDetail: [],
    similarJobs: [],
    Loader: true,
  };
  componentDidMount() {
    const JwtToken = Cookie.get("JobbyjwtToken");
    let options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JwtToken}`,
      },
    };

    const url = `https://apis.ccbp.in/jobs/${this.props.match.params.id}`;
    fetch(url, options)
      .then((res) => {
        return res.json();
      })
      .then((jsonBody) => {
        this.setState({
          ResultDetail: jsonBody.job_details,
          similarJobs: jsonBody.similar_jobs,
          Loader: false,
        });
      });
  }

  render() {
    const jwtToken = Cookie.get("JobbyjwtToken");
    if (jwtToken === undefined) {
      return <Redirect to="/login" />;
    }
    const { ResultDetail } = this.state;

    const { skills, life_at_company } = ResultDetail;

    const AllSkills =
      skills &&
      skills.map((eachItem) => {
        return (
          <div className="skillDivIndividual">
            <img src={eachItem.image_url} width={50} height={50} alt="skills" />
            <strong>{eachItem.name}</strong>
          </div>
        );
      });

    const LifeAtCompany = life_at_company && (
      <div className="LifeAtCompanyDiv1 ">
        <p>{life_at_company.description}</p>
        <img src={life_at_company.image_url} alt="companyInfraImage" />
      </div>
    );

    const similarJobs = this.state.similarJobs.map((eachItem) => {
      return <SimilarjobItem key={eachItem.id} similarJobsData={eachItem} />;
    });

    return (
      <div className="searchItemResultDetailMain">
        <Header />
        <div className="forAnimation">
          {this.state.Loader ? (
            <div className="Loader3">
              <Loader
                className="loader"
                type="ThreeDots"
                color="#ffffff"
                height={30}
                width={40}
                // timeout={3000} //3 secs
              />
            </div>
          ) : (
            <div>
              <div className="searchItemResultDetail">
                <Searchresultitem
                  renderLink={false}
                  searchResultData={this.state.ResultDetail}
                />
                <div className="skillDiv">
                  <div className="siteVisit">
                    <strong>Skills</strong>
                    <a href={this.state.ResultDetail.company_website_url}>
                      visit
                      <img
                        src={Arrow}
                        width={15}
                        height={15}
                        alt="visitCompanyArrow"
                      />
                    </a>
                  </div>

                  <div className="skillDiv1">{AllSkills}</div>
                </div>

                <div className="LifeAtCompanyDiv ">
                  <strong>Life at Company</strong>

                  {LifeAtCompany}
                </div>
              </div>
              <div className="similarJobDiv">
                <h2>Similar Jobs</h2>
              </div>
              <div className="similarJobMain">
                <div className="similarJobResultsDiv">{similarJobs}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SearchResultItemDetail;
