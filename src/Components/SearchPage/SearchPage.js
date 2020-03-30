import React, { Component } from 'react'
import Axios from 'axios'

class SearchPage extends Component {
    constructor(){
        super()
        this.state = {
            scrape: []
        }
    }

    scrape = () => {
        Axios.get('/api/scrape').then(res => {
            console.log('what we have to work with', res.data.theData)
            this.setState({
                scrape: res.data.theData[0]
            })
        }).catch(err => console.log(err))
    }

    render() {
        const mappedScrape = this.state.scrape.map((elem, i) => {
            return <div key={i} >
                <a href={elem.link}>{elem.title}</a>

                <h2>{elem.company}</h2>
                <h2>{elem.location}</h2>
                <h2>{elem.description}</h2>
                <h2>{elem.date}</h2>
            </div>
        })
        console.log('state', this.state)
        return (
            <div>
                This is the Search Page
                <button onClick={this.scrape}>Scrape</button>
                {mappedScrape}
            </div>
        )
    }
}
export default SearchPage
