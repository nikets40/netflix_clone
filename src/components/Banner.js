import React, { useState, useEffect } from "react";
import axios from "../axios";
import requests from "../requests";


const baseURL = "https://image.tmdb.org/t/p/original/";

function truncate(str, n){
    return str?.length >n ? str.substr(0, n-1)+ "..." : str;
}

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * (request?.data?.results?.length??1) - 1)
        // 4
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  console.log(movie);
  console.log(baseURL+movie.backdrop_path)

  return (
    <header className="banner"
    style={
        {
            backgroundSize : "cover",
            backgroundImage : `url("${baseURL+movie?.backdrop_path}")`,
        
        }
    }
    >
        
        <div className="banner_fadeBottom">
        <div className="banner_contents">
            <h1 className="banner_title">
                {movie.name || movie?.title || movie?.original_name}
            </h1>
            <div className="banner_buttons" >
                <button className="banner_button">Play</button>
                <button className="banner_button">My List</button>
            </div>

            <h1 className="banner_description">{truncate(movie?.overview??"", 500)}</h1>
        </div>
        </div>
    </header>
  );
}

export default Banner;
