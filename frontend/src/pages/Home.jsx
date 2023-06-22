import SearchBar from '../components/searchBar';


import '../styles/home.css';


const Home = () => {
  return (
    <div className='home-page'>
      <div className="home-container">
        <h1>Search for a cradle</h1>
        <SearchBar />
      </div>
      <section className='how-it-works' >
        <h1>How it Works</h1>
        <div className='steps'>
          <div className='step'>
            <h2> Browse and Filter </h2>
            <p> Explore our extensive collection of car seats, carefully curated to meet various age groups, sizes, and brands. Use our intuitive filtering options to find the perfect match for your child's needs.</p>
          </div>
          <div className='step'>
            <h2> Choose a cradle </h2>
            <p> Add your selected car seat to the cart and proceed to our secure checkout. Our user-friendly interface makes it effortless to review your order and finalize the rental.</p>
          </div>
          <div className='step'>
            <h2>  Secure Payment and Confirmation </h2>
            <p> Enjoy peace of mind with our seamless payment process powered by Stripe, guaranteeing secure transactions. </p>
          </div>
        </div>
      </section>
      <section>
        <h1>Featured Brands</h1>
        <div className='brands'>
          
          <img src="britax.png" alt="britax" />
          <img src="graco.png" alt="graco" />
          <img src="uppa.png" alt="uppa" />
          <img src="chicco.png" alt="chicco" />
          <img src="even.png" alt="even" />
          <img src="clek.png" alt="clek" />
        </div>

      </section>
    </div>
  );
};

export default Home;