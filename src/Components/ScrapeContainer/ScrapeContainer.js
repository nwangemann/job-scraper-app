import React from "react";
import './ScrapeContainer.css'

function ScrapeContainer(props) {
  const mappedScrape = props.scrape.map((elem, i) => {
    return (
      <div key={i} className="listingContainer">
        <a href={elem.link}>{elem.title}</a>
        <h5>{elem.company}</h5>
        <h5>{elem.location}</h5>
        <h5>{elem.description}</h5>
        <h5>{elem.date}</h5>
      </div>
    );
  });

  return (
    <div>
        {mappedScrape}
    </div>
  );
}
export default ScrapeContainer;
