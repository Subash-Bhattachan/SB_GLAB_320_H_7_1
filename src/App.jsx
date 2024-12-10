import {useState, useEffect} from "react";
//import logo from "./logo.svg";
import "./App.css";

import MovieDisplay from "./components/MovieDisplay";
import Form from "./components/Form";

export default function App() {
  const apiKey = "98e3fb1f";

  const [movie, setMovie] = useState(null);

  const getMovie = async(searchTerm) => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`
      );
      const data = await response.json();
      setMovie(data);
    } catch(e) {
      console.error(e)
    }
  }

  // This will run on the first render but not on subsquent renders
  // useEffect(() => {
  //   getMovie("Clueless");
  // }, []);

// this will grab a random movie on each page refresh and not start with the same movie "Clueless" each time.
  useEffect(() => {
    // List of movie titles to choose from
    const randomMovies = [
      "Godfather",
      "RRR",
      "Speed",
      "Little Miss Sunshine",
      "Norbit",
      "Frozen",
      "Devdas",
      "Saw",
      "Usual Suspect",
      "Water",
      "Broken Arrow",
      "Pan's Labyrinth"
    ];

    // this select the random movie
    const randomMovie = randomMovies[Math.floor(Math.random() * randomMovies.length)];
    
    getMovie(randomMovie);
  }, []);

  return (
    <div className="App">
      <Form moviesearch={getMovie} />
      <MovieDisplay movie={movie} />
    </div>
  );
}