import React, { useState } from "react";
import axios from "axios";
import './SearchPage.css'
import ScrapeContainer from '../ScrapeContainer/ScrapeContainer'

function SearchPage() {
  const [scrape, setScrape] = useState([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [selectedJob, setSelectedJob] = useState('indeed')

  function search() {
    let body = {
      title: title,
      location: location
    };
    axios
      .post(`/api/${selectedJob}`, body)
      .then(res => {
        setScrape(res.data)
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <input type="text" onChange={e => setTitle(e.target.value)} placeholder="Job Title" name="title" />
      <input type="text" onChange={e => setLocation(e.target.value)} placeholder="Location" name="location" />
       
      
      <label>Choose where you want to Search:</label>
      <select onChange={e => setSelectedJob(e.target.value)}id="jobs">
        <option value="indeed">Indeed</option>
        <option value="dice">Dice</option>
        <option value="zr">Zip Recruiter</option>
        <option value="glassdoor">Glassdoor</option>
        
      </select>
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
