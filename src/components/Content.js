import React from 'react'
import requests from '../requests';
import Row from './Row';

function Content() {
    return (
        <div>
            <Row title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} isLargeRow/>
        <Row title="Trending" fetchUrl={requests.fetchTrending}/>
        <Row title="Action" fetchUrl={requests.fetchActionMovies}/>
        <Row title="Comedy" fetchUrl={requests.fetchComedyMovies}/>
        <Row title="Horror" fetchUrl={requests.fetchHorrorMovies}/>
        <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries}/>
        
        </div>
    )
}

export default Content
