import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [cradles, setCradles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/movies')
      .then(response => response.json())
      .then(data => {
        setCradles(data);
      })
      .catch(error => console.error('Failed to fetch movies:', error));
  }, []);

  return (
    <div className="App">
      {cradles}
    </div>
  );
}

export default App;