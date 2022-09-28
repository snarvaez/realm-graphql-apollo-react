import "./styles.css";
import * as React from "react";
import { APP_ID } from "./index";
import { useQuery, useMutation } from "@apollo/client";
import { FIND_MOVIE, UPDATE_MOVIE, GET_TELEMETRY } from "./graphql-operations";

import { Button } from './Button.js'; 
import { ListComponent } from './ListComponent.js'; 

export default function App(props) {
  const [searchTitle, setSearchTitle] = React.useState("the");
  const [searchPlot, setSearchPlot] = React.useState("mysterious rebels");
  const [searchCastCrewDirs, setSearchCastCrewDirs] = React.useState("hugo");

  const [telemetryYear, setTelemetryYear] = React.useState(2022);
  const [telemetryMonth, setTelemetryMonth] = React.useState(2);

  

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

  //console.log("movie: " + JSON.stringify(movie));
  //console.log("data: " + JSON.stringify(data));

  const movieId = (movie && data.movie && data.movie._id) || null;
  console.log("movieID: " + movieId);
  
  var { loadingTelemetry, telemetryData } = useQuery(GET_TELEMETRY, {
    skip: !movieId,
    variables: { 
      query: { 
        movieId: {
          _id: movieId
        },
        year: telemetryYear,
        month: telemetryMonth
      }
    }
  });

  const movieTelemetry = telemetryData ? telemetryData.myTelemetry : null;
  const movieTelemetryId = (movieTelemetry && movieTelemetry.myTelemetry && movieTelemetry.myTelemetry._id) || null;
  
  console.log("movieTelemetryId: " + movieTelemetryId);
  console.log(JSON.stringify(movieTelemetry));
  console.log(JSON.stringify(loadingTelemetry));
  console.log(JSON.stringify(telemetryData));

  //const [components, setComponents] = React.useState(["Mercury"]); 
  //const [componentNames, setComponentNames] = React.useState([ 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune' ]); 
  const [components, setComponents] = React.useState([]); 
  const [componentNames, setComponentNames] = React.useState([]); 

  
  function addComponent() {

    window.alert("movieId: " +movieId);

    if (loadingTelemetry)
      window.alert("telemetry!!");
    
    setComponents([...components, [telemetryData.length]]);
    if (componentNames.length > 0) { 
      //setComponents([...components, componentNames[0]]);
      //setComponents([...components, [movieId, telemetryYear, telemetryMonth]]]);
      componentNames.splice(0, 1);
    } else { 
      window.alert("No more planets to add!");
    } 

    return ( 
      <div> 
        <Button onClick={addComponent} text="Call Component"/> 
        {components.map((item, i) => ( <ListComponent text={item} /> ))} 
      </div> 
    ) 
  } 

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

      <div>
        <div className="telemetry-input">
        <h1>Obtain Viewer Telemetry</h1>
        <b>Year:</b><input
            className="fancy-input"
            value={telemetryYear}
            onChange={(e) => setTelemetryYear(e.target.value)}
            type="text"
          />
          <br/>
          <b>Month:</b><input
            className="fancy-input"
            value={telemetryMonth}
            onChange={(e) => setTelemetryMonth(e.target.value)}
            type="text"
          />
        </div>

        <div> 
          <Button onClick={addComponent} text="Call Component"/> 
          {components.map((item, i) => ( <ListComponent text={item} /> ))} 
        </div> 
        
      </div> 

      
    </div>
  );
}


/*
<table>
        <th>
          <td>year</td>
          <td>month</td>
          <td>day</td>
          <td>hour</td>
          <td>min</td>
          <td>userId</td>
          <td>resumePointSecs</td>
        </th>
        {movieTelemetry && (
            <tr key={movieTelemetry._id}>
              <td>{movieTelemetry.year}</td>
              <td>{movieTelemetry.month}</td>
              <td>{movieTelemetry.day}</td>
              <td>{movieTelemetry.hour}</td>
              <td>{movieTelemetry.min}</td>
              <td>{movieTelemetry.userId}</td>
              <td>{movieTelemetry.resumePointSecs}</td>
            </tr>
          )}
        </table>
*/