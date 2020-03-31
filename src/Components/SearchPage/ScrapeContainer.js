import React from "react";


function ScrapeContainer(props) {
  const mappedScrape = props.scrape.map((elem, i) => {
    return (
      <div key={i}>
        <a href={elem[1]}>{elem[0]}</a>

        <h4>{elem[2]}</h4>
        <h4>{elem[3]}</h4>
        <h4>{elem[4]}</h4>
        <h4>{elem[5]}</h4>
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
