import { Route, Routes } from "react-router-dom";
import Navbar from './components/navbar';
import Home from "./pages/Home";
import Cradles from "./pages/Cradles";
import Works from "./pages/Works";
import ProductPage from "./pages/ProductPage";
import Footer from "./components/footer";


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="cradles" element={<Cradles />} />
        <Route path="works" element={<Works />} />
        <Route path="product/:id" element={<ProductPage />} /> {/* New route for the product page */}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;