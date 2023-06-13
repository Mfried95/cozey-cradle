import React from 'react';
import SearchBar from '../components/searchBar';

const Home = () => {
  return (
    <div>
      <section>
        <h1>Search for a cradle</h1>
        <SearchBar />
      </section>
      <section>
        <h1>How It Works</h1>
      </section>
    </div>
  );
};

export default Home;