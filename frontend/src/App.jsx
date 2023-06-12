import { Route, Routes } from "react-router-dom";
import Navbar from './components/navbar';
import Home from "./pages/Home";
import Cradles from "./pages/Cradles";
import Works from "./pages/Works";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Cradles" element={<Cradles />} />
        <Route path="Works" element={<Works />} />
      </Routes>
    </div>
  );
};

export default App;