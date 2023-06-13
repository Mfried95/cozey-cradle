import React from 'react';
import SearchBar from '../components/searchbar';
import Footer from '../components/footer';

const Home = () => {
  return (
    <div>
      <div>
        <h1>Search for a cradle</h1>
        <SearchBar />
      </div>     
       <div className="home-image">
        <h1>How It Works</h1>
      </div>
      
    </div>
  );
};

export default Home;