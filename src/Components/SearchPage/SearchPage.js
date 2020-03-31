import React, { useState } from "react";
import axios from "axios";
import ScrapeContainer from './ScrapeContainer'

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
          console.log('res', res)
          setScrape(res.data)
        // let newArr = [];
        // let array = res.data[0].map(elem => {
        //   let item = [
        //     elem.title.toString(),
        //     elem.link.toString(),
        //     elem.company.toString(),
        //     elem.location.toString(),
        //     elem.description.toString(),
        //     elem.date.toString()
        //   ];
        //   newArr.push(item);
        //   return item;
        // });
        // console.log("array", array);
        // setScrape(newArr);
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      This is the Search Page
      <input
        type="text"
        onChange={e => setTitle(e.target.value)}
        placeholder="title"
        name="title"
      />
      <input
        type="text"
        onChange={e => setLocation(e.target.value)}
        placeholder="location"
        name="location"
      />
      <button onClick={search}>Search</button>

      {
      scrape 
      ? 
      <ScrapeContainer scrape={scrape}/> 
      : 
      null
      }

    </div>
  );
}
export default SearchPage;
