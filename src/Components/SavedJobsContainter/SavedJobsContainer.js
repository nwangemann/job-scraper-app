import React from 'react'

function SavedJobsContainer(props){
    const mappedScrape = props.savedList.map((elem, i) => {
      return (
        <div key={i} className="listingContainer">
          <a href={elem.link}>{elem.title}</a>
          <h5>Company: {elem.company}</h5>
          <h5>Location: {elem.location}</h5>
          <h5>Description: {elem.description}</h5>
          <h5>{elem.date}</h5>
          <h5>From: {elem.website}</h5>
          <button onClick={props.deleteListing} value={elem.jobs_id}>Delete</button>
        </div>
      );
    });
        return (
            <div>
                {mappedScrape}
            </div>
        )
}

export default SavedJobsContainer