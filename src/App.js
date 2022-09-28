import "./styles.css";
import * as React from "react";
import { APP_ID } from "./index";
import { useQuery, useMutation } from "@apollo/client";
import { FIND_MOVIE, UPDATE_MOVIE } from "./graphql-operations";

export default function App(props) {
  const [searchTitle, setSearchTitle] = React.useState("the");
  const [searchPlot, setSearchPlot] = React.useState("mysterious rebels");
  const [searchCastCrewDirs, setSearchCastCrewDirs] = React.useState("hugo");

  const { loading, data } = useQuery(FIND_MOVIE, {
    variables: { 
      query: { 
        title: searchTitle,
        plot:  searchPlot,
        cast:  searchCastCrewDirs
      }
    }
  });

  const movie = data ? data.movie : null;
  const [updateMovie, { loading: updating }] = useMutation(UPDATE_MOVIE);
  const [newTitleText, setNewTitleText] = React.useState("Silly New Title");

  const updateMovieTitle = async () => {
    if (!movie) return;
    await updateMovie({
      variables: {
        query: { title: movie.title },
        set: { title: newTitleText }
      }
    });
    setSearchTitle(newTitleText);
  };

  return (
    <div className="App">
      <h1>Find a Movie</h1>
      <span className="subheading">
        The app automatically searches as you type
      </span>
      <div className="title-input">
        <input
          className="fancy-input"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          type="text"
        />
        <br/>
        <b>Plot:</b><input
          className="fancy-input"
          value={searchPlot}
          onChange={(e) => setSearchPlot(e.target.value)}
          type="text"
        />
       <br/>
        <b>Cast, Crew & Directors:</b><input
          className="fancy-input"
          value={searchCastCrewDirs}
          onChange={(e) => setSearchCastCrewDirs(e.target.value)}
          type="text"
        />
      </div>
      {APP_ID === "<Your App ID>" ? (
        <div className="status important">
          Replace APP_ID with your App ID in index.js
        </div>
      ) : (
        !loading &&
        !movie && <div className="status">No movie with that name!</div>
      )}
      {movie && (
        <div>
          {!updating && (
            <div className="title-input">
              <input
                type="text"
                className="fancy-input"
                value={newTitleText}
                onChange={(e) => setNewTitleText(e.target.value)}
              />
              <button
                className="fancy-button"
                onClick={() => updateMovieTitle()}
              >
                Change the movie title
              </button>
            </div>
          )}
          <h2>{movie.title}</h2>
          <div><b>Year</b>: {movie.year}</div><br/>
          <div><b>Plot</b>: {movie.plot}</div><br/>
          <div><b>Full Plot</b>: {movie.fullplot}</div><br/>
          <div><b>Cast</b>: {movie.cast}</div><br/>
          <div><b>Directors</b>: {movie.directors}</div><br/>
          <div><b>Writers</b>: {movie.writers}</div><br/>
          <div><b>Year</b>: {movie.year}</div><br/>
          <div><b>Runtime</b>: {movie.runtime} minutes</div><br/>
          <br />
          <img alt={`Poster for ${movie.title}`} src={movie.poster} />
        </div>
      )}
    </div>
  );
}