import React from "react";
import "../styles/ResultItem.css";
import Rating from "../styles/Rating.png";
import Location from "../styles/location.png";
import Employment from "../styles/employment.png";
import { Link } from "react-router-dom";
import "../styles/searchItemResultDetail.css";
class Searchresultitem extends React.Component {
  render() {
    const { searchResultData, renderLink } = this.props;
    const {
      company_logo_url,
      title,
      rating,
      location,
      employment_type,
      package_per_annum,
      job_description,
    } = searchResultData;

    const renderChilds = (
      <div className="ResultDiv">
        <div className="ResultDetail">
          <div className="ImgDiv">
            <img
              src={company_logo_url}
              width={50}
              height={50}
              alt="companyLogo"
            />
            <div className="titleDiv">
              <strong>{title}</strong>
              <div className="RatingDiv">
                <img src={Rating} width={25} height={25} alt="rating" />
                <strong>{rating}</strong>
              </div>
            </div>
          </div>
          <div className="packageDiv">
            <div className="locationDiv">
              <img src={Location} width={20} height={20} alt="location" />
              <span>{location}</span>
              <div className="locationDiv1">
                <img src={Employment} width={20} height={20} alt="EmpType" />
                <span>{employment_type}</span>
              </div>
            </div>

            <span className="salaryDiv">{package_per_annum}</span>
          </div>
        </div>
        <div className="ResultDescription">
          <strong>Description</strong>
          <p>{job_description}</p>
        </div>
      </div>
    );
    return (
      <>
        {renderLink ? (
          <Link
            to={`/Jobs/${this.props.searchResultData.id}`}
            className="searchResultItemLink"
          >
            {renderChilds}
          </Link>
        ) : (
          <div
            className="searchItemDetailfirst"
            // style={{ display: "contents" }}
          >
            {renderChilds}
          </div>
        )}
      </>
    );
  }
}
export default Searchresultitem;
