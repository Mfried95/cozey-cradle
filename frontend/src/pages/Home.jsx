import SearchBar from '../components/searchBar';


import '../styles/home.css';


const Home = () => {
  return (
    <div>
      <div className="home-container">
        <h1>Search for a cradle</h1>
        <SearchBar />
      </div>
      <section>
        <h1>How it Works</h1>

      </section>
    </div>
  );
};

export default Home;