import React from "react";
import "./SavedJobsContainer.scss";

function SavedJobsContainer(props){
    const mappedScrape = props.savedList.map((elem, i) => {
      return (
        <div key={i} className="savedListingContainer">
          <a className="jobTitle" id="Title" href={elem.link}>{elem.title}</a>
          <h5 className="scrapeContent"><span className="displayCategory">Company</span>: {elem.company}</h5>
          <h5 className="scrapeContent"><span className="displayCategory">Location</span>: {elem.location}</h5>
          <h5 className="scrapeContent"><span className="displayCategory">Description</span>: {elem.description}</h5>
          <h5>{elem.date}</h5>
          <h5>From: {elem.website}</h5>
          <button onClick={props.deleteListing} value={elem.jobs_id} className="deleteButtonSaved">Delete</button>
        </div>
      );
    });
        return (
            <div>
                {mappedScrape}
            </div>
        )
}

export default SavedJobsContainer;
