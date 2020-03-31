import React, { useState } from 'react'
import axios from 'axios'

function SearchPage (){
    const [scrape, setScrape] = useState([])
    const [title, setTitle] = useState('')
    const [location, setLocation] = useState('')

    function search(){
        let body = {
            title: title,
            location: location
        }
        axios.post('/api/search', body).then(res => {
            console.log('res', res)
            let newArr = []
            let array = res.data[0].map(elem => {
                console.log('elem', elem)
                let item = [
                    elem.title.toString(),
                   elem.link.toString(),
                   elem.company.toString(),
                    elem.location.toString(),
                    elem.description.toString(),
                   elem.date.toString()
                ]
                newArr.push(item)
                return item
            })
            console.log('array', array)
            console.log('newArr', newArr)
            setScrape(newArr)
        }).catch(err => console.log(err))
    }

    function getScrape() {
        axios.get('/api/scrape').then(res => {
            let result = res.data.theData[0]
            setScrape(result)
        }).catch(err => console.log(err))
    }


        const mappedScrape = scrape.map((elem, i) => {
            console.log('elem', elem)
            return <div key={i} >
                <a href={elem[1]}>{elem[0]}</a>

                <h4>{elem[2]}</h4>
                <h4>{elem[3]}</h4>
                <h4>{elem[4]}</h4>
                <h4>{elem[5]}</h4>
            </div>
        })
        return (
            <div>
                This is the Search Page
                <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder="title" name="title" /> 
                <input type="text" onChange={(e) => setLocation(e.target.value)} placeholder="location" name="location" /> 
                <button onClick={search}>Search</button>
                <button onClick={getScrape}>getScrape</button>
                {mappedScrape}
                {/* {scrape} */}
            </div>
        )
}
export default SearchPage
