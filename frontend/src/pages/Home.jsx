import React from 'react';
import SearchBar from '../components/searchBar';
import Footer from '../components/footer';

const Home = () => {
  return (
    <div>
      <div>
        <h1>Search for a cradle</h1>
        <SearchBar />
      </div>
      <section>
        <h1>How It Works</h1>
      </section>
    </div>
  );
};

export default Home;