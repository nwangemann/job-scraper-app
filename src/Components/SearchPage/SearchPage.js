import React, { useState } from "react";
import axios from "axios";
import "./SearchPage.scss";
import ScrapeContainer from "../ScrapeContainer/ScrapeContainer";
import { SemipolarLoading } from "react-loadingg";

function SearchPage() {
  const [scrape, setScrape] = useState([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [selectedJob, setSelectedJob] = useState("indeed");
  const [loading, setLoading] = useState(false);

  function search() {
    setScrape([]);
    setLoading(true);
    let body = {
      title: title,
      location: location
    };
    axios
      .post(`/api/${selectedJob}`, body)
      .then(res => {
        setScrape(res.data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="outermost_div">
      <div className="contentParent">
        <nav className="sticky">
          <div className="inputParent">
          <input
            type="text"
            onChange={e => setTitle(e.target.value)}
            placeholder="Job Title"
            name="title"
            className="searchElement"
          />
          <input
            type="text"
            onChange={e => setLocation(e.target.value)}
            placeholder="Location"
            name="location"
            className="searchElement"
          />
        </div>
        <div className="dropdownParent">
          <label className="searchText" >Choose where you want to Search:</label>
          <select className="searchElement" onChange={e => setSelectedJob(e.target.value)} id="jobs">
            <option value="indeed">Indeed</option>
            <option value="dice">Dice</option>
            <option value="zr">Zip Recruiter</option>
            <option value="glassdoor">Glassdoor</option>
            <option value="linkedin">LinkedIn</option>
          </select>
          <button className="searchElement searchButton" onClick={search}>Search</button>
          </div>
        </nav>
      </div>

      <div className="scrapeContainerParent">
        {loading ? (
          <SemipolarLoading color="#F4AF1B" size="large" speed="2" />
        ) : null}

        {scrape ? <ScrapeContainer scrape={scrape} /> : null}
      </div>
    </div>
  );
}
export default SearchPage;