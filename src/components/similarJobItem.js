import React from "react";
import Rating from "../styles/Rating.png";
import Location from "../styles/location.png";
import Employment from "../styles/employment.png";
import { Link } from "react-router-dom";

class SimilarjobItem extends React.Component {
  render() {
    const { similarJobsData } = this.props;
    const {
      company_logo_url,
      title,
      rating,
      job_description,
      location,
      employment_type,
      id,
    } = similarJobsData;

    return (
      <div className="AllSimilarJobItems">
        <Link to={`/Jobs/${id}`} className="similarJobItemLink">
          <div className="dummy">
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
            <div className="similarJobDescription">
              <strong>Description</strong>
              <p>{job_description}</p>
            </div>
            <div className="loacationDiv">
              <img src={Location} width={20} height={20} alt="location" />
              <span>{location}</span>
              <div className="locationDiv1">
                <img src={Employment} width={20} height={20} alt="EmpType" />
                <span>{employment_type}</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default SimilarjobItem;
