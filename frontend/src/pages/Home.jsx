import SearchBar from '../components/searchBar';


import '../styles/home.css';


const Home = () => {
  return (
    <div>
      <div>
        <h1>Search for a cradle</h1>
        <SearchBar />
      <section className="how-it-works-section">
        <h1 className="heading">How It Works</h1>
        <p className="description">Renting a car seat with Cozey Cradle is easy and convenient. Here's how it works:</p>
        <div className="step">
          <h2>1. Browse and Filter</h2>
          <p>Explore our extensive collection of car seats, carefully curated to meet various age groups, sizes, and brands. Use our intuitive filtering options to find the perfect match for your child's needs.</p>
        </div>
        <div className="step">
          <h2>2. Check Availability and Select Dates</h2>
          <p>Check the availability of your preferred car seat using our interactive calendar. Select the desired rental dates, ensuring a seamless and hassle-free experience for your family.</p>
        </div>
        <div className="step">
          <h2>3. Choose Pickup Location</h2>
          <p>Select a convenient pickup location from our wide network of cities. Cozey Cradle strives to offer flexibility and accessibility, ensuring a smooth rental process wherever you are.</p>
        </div>
        <div className="step">
          <h2>4. Add to Cart and Checkout</h2>
          <p>Add your selected car seat to the cart and proceed to our secure checkout. Our user-friendly interface makes it effortless to review your order and finalize the rental.</p>
        </div>
        <div className="step">
          <h2>5. Secure Payment and Confirmation</h2>
          <p>Enjoy peace of mind with our seamless payment process powered by Stripe, guaranteeing secure transactions. Once your payment is confirmed, you'll receive a confirmation email with all the details.</p>
        </div>
      </section>
    </div>
    </div>
  );
};

export default Home;