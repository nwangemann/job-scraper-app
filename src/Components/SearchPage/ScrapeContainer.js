import React from "react";


function ScrapeContainer(props) {
    console.log('props', props)
  const mappedScrape = props.scrape.map((elem, i) => {
    return (
      <div key={i}>
        <a href={elem.link}>{elem.title}</a>

        <h4>{elem.company}</h4>
        <h4>{elem.location}</h4>
        <h4>{elem.description}</h4>
        <h4>{elem.date}</h4>
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
