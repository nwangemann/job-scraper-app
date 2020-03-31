import React, { useState } from 'react'
import axios from 'axios'

function SearchPage (){
    const [scrape, setScrape] = useState([])

    function getScrape() {
        axios.get('/api/scrape').then(res => {
            console.log('what we have to work with', res.data.theData)
            let result = res.data.theData[0]
            setScrape(result)
        }).catch(err => console.log(err))
    }


        const mappedScrape = scrape.map((elem, i) => {
            return <div key={i} >
                <a href={elem.link}>{elem.title}</a>

                <h4>{elem.company}</h4>
                <h4>{elem.location}</h4>
                <h4>{elem.description}</h4>
                <h4>{elem.date}</h4>
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
