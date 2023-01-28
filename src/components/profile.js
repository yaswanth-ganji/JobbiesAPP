import React from "react";
import "../styles/Job.css";
import Cookie from "js-cookie";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class Profile extends React.Component {
  state = {
    profileDetails: [],
    apiStatus: "INITIAL",
  };
  componentDidMount() {
    this.ProfileApi();
  }
  ApiCallAgain = () => {
    this.ProfileApi();
  };
  ProfileApi = () => {
    this.setState({ apiStatus: "INPROGRESS" });
    const JwtToken = Cookie.get("JobbyjwtToken");
    let options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JwtToken}`,
      },
    };

    let url = "https://apis.ccbp.in/profile";

    fetch(url, options)
      .then((res) => {
        return res.json();
      })
      .then((jsonBody) => {
        this.setState({
          profileDetails: jsonBody.profile_details,
          apiStatus: "SUCCESS",
          // loader: false,
        });
      })
      .catch(() => {
        this.setState({ apiStatus: "FAIL" });

        console.log(this.state.apiStatus);
      });
  };
  renderSuccessCase = () => {
    return (
      <div className="profileDiv">
        <div className="profileDiv1">
          <img
            src={this.state.profileDetails.profile_image_url}
            alt="profileImg"
          />
          <p>{this.state.profileDetails.name}</p>
          <span>{this.state.profileDetails.short_bio}</span>
        </div>
      </div>
    );
  };
  renderinProgressCase = () => {
    return (
      <div className="profileDiv">
        <Loader
          className="loader"
          type="ThreeDots"
          color="#ffffff"
          height={30}
          width={40}
          timeout={5000} //5 secs
        />
      </div>
    );
  };

  renderFailCase = () => {
    return (
      <div className="profileDiv">
        <div className="profileFailContent">
          <span className="ProfilFailSpan"> Oops.,</span>
          <span className="ProfilFailSpan">Something went wrong.</span>
          <span className="ProfilFailSpan"> Retry...</span>
        </div>

        <button className="RetryButton" onClick={this.ApiCallAgain}>
          Retry
        </button>
      </div>
    );
  };

  render() {
    // this.failDivShow();
    switch (this.state.apiStatus) {
      case "SUCCESS":
        return this.renderSuccessCase();
      case "INPROGRESS":
        return this.renderinProgressCase();
      case "FAIL":
        return this.renderFailCase();

      default:
        return null;
    }
  }
}

export default Profile;
