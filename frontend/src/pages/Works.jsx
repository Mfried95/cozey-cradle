import '../styles/works.css';


const Works = () => {
  return (
    <div className='container'>
      <div className='heading'>
        <h2> Renting a Car Seat Made Easy </h2>
        <h3>
          Renting a car seat is as simple as 1, 2, 3. All you need is to provide your desired dates, choose the category of car seat, and be ready to ensure the safety of your child during the journey.
        </h3>
      </div>

      <div className="step-container">
        <div>
          <div className="step">
            <img src="../public/icon-blue-1.png" alt="How it Works - step 1" />
            <h4>Choose the dates</h4>
          </div>
          <p>Select the dates and city for you to get started.</p>
        </div>

        <div>
          <div className="step">
            <img src="../public/icon-blue-2.png" alt="How it Works - step 2" />
            <h4>Choose the product</h4>
          </div>
          <p> Choose a car seat from our wide range of products available. All the available products for your desired time slots shown on screen</p>
        </div>

        <div>
          <div className="step">
            <img src="../public/icon-blue-3.png" alt="How it Works - step 3" />
            <h4>Book your product</h4>
          </div>
          <p> Once decided, you can book your product from our application within minutes.</p>
        </div>
      </div>

    </div>

  );
};

export default Works;