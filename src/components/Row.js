import React, { useState, useEffect } from "react";
import axios from "../axios";
import YouTube from "react-youtube";
import movieTrailer from 'movie-trailer';

const baseURL = "https://image.tmdb.org/t/p/original/";
var currentMovieID = "";

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");


  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = (movie) => {
      console.log("Playing movie id", currentMovieID);
      console.log("movie id", movie.id);

    if (currentMovieID===movie.id) {
      console.log("clicked for removal");
      setTrailerUrl("");
      currentMovieID= "";
    } else {
      console.log("clicked for playing");
      currentMovieID = movie.id;
      console.log(movie);
     var type = (movie?.release_date==null) ? "tv" : "movie";
     async function getTrailerData(){
      const trailerData = await axios.get(`https://api.themoviedb.org/3/${type}/${movie.id}/videos?api_key=85044227745de1325521b8c38082ad74`);
      console.log(trailerData.data.results[0]?.key||"");
      setTrailerUrl(trailerData.data.results[0]?.key||"");
     }
     getTrailerData();
     console.log("currently playing",currentMovieID)
        
    }
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="row">
      <h1>{title}</h1>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`poster ${isLargeRow && "row_posterLarge"}`}
            src={`${baseURL}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
