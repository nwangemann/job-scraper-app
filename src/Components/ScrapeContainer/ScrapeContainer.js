import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./ScrapeContainer.scss";
import axios from "axios";

function ScrapeContainer(props) {
  const user_id = useSelector(state => state.user.user_id);
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const [successMessage, setSuccessMessage] = useState(1000);

  function save(e) {
    let body = e.target.value.split(" ** ");
    let targetListing = e.target.id;
    let listingBody = {
      title: body[0],
      link: body[1],
      company: body[2],
      location: body[3],
      description: body[4],
      date: body[5],
      website: body[6]
    };
    axios
      .post(`/api/listings/${user_id}`, listingBody)
      .then(res => {
        celebrateSuccess(targetListing);
      })
      .catch(err => console.log(err));
  }

  function celebrateSuccess(indexOfTarget) {
    setSuccessMessage(indexOfTarget);
    setTimeout(function() {
      setSuccessMessage({ successMessage: false });
    }, 2000);
  }

  const mappedScrape = props.scrape.map((elem, i) => {
    return (
      <div key={i} className="listingContainer">
        <a className="jobTitle" id="Title" href={elem.link}>{elem.title}</a>
        <h5 className="scrapeContent"><span className="displayCategory">Company</span>: {elem.company}</h5>
        <h5 className="scrapeContent"><span className="displayCategory">Location</span>: {elem.location}</h5>
        <h5 className="scrapeContent"><span className="displayCategory">Description</span>: {elem.description}</h5>
        <h5 className="scrapeContent">{elem.date}</h5>
        {isLoggedIn ? (
          <button
            onClick={save}
            id={i}
            className="saveButton"
            value={`${elem.title} ** ${elem.link} ** ${elem.company} ** ${elem.location} ** ${elem.description} ** ${elem.date} ** ${elem.website}`}
          >
            Save
          </button>
        ) : null}
        {+successMessage === +i ? (
          <p id="successMessage">Added to saved listings</p>
        ) : null}
      </div>
    );
  });

  return <div className="mappedScrapeParentContainer">{mappedScrape}</div>;
}
export default ScrapeContainer;
