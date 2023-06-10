import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/movies')
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.error('Failed to fetch movies:', error));
  }, []);

  return (
    <div className="App">
      {console.log(movies)}
      <h1>Movies</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie._id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;