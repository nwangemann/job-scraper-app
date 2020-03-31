import React, { useState } from 'react'
import Axios from 'axios'

function SearchPage() {
    const [scrape, setScrape] = useState([]);
      
    
    function getScrape() {
        Axios.get('/api/scrape').then(res => {
            console.log('res', res)
            setScrape(res.data.theData[0])          
        }).catch(err => console.log(err))
    }

        const mappedScrape = scrape.map((elem, i) => {
            return <div key={i} >
                <a href={elem.link}>{elem.title}</a>
                <h2>{elem.company}</h2>
                <h2>{elem.location}</h2>
                <h2>{elem.description}</h2>
                <h2>{elem.date}</h2>
            </div>
        })
        return (
            <div>
                This is the Search Page
                <button onClick={getScrape}>Scrape</button>
                {mappedScrape}
            </div>
        )
    }

export default SearchPage
