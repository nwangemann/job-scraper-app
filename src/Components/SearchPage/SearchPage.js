import React, { useState } from "react";
import axios from "axios";
import './SearchPage.css'
import ScrapeContainer from '../ScrapeContainer/ScrapeContainer'

function SearchPage() {
  const [scrape, setScrape] = useState([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  function search() {
    let body = {
      title: title,
      location: location
    };
    axios
      .post("/api/search", body)
      .then(res => {
        console.log('res.data', res)
        setScrape(res.data)
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <input type="text" onChange={e => setTitle(e.target.value)} placeholder="Job Title" name="title" />
      <input type="text" onChange={e => setLocation(e.target.value)} placeholder="Location" name="location" />
      <button onClick={search}>Search</button>
      <div className="scrapeContainerParent">
        
        {
        scrape ? 
        <ScrapeContainer scrape={scrape}/> 
        : 
        null
        }
      </div>
    </div>
  );
}
export default SearchPage;
