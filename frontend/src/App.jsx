import { Route, Routes } from "react-router-dom";
import Navbar from './components/navbar'
import Home from "./pages/Home";
import Cradles from "./pages/cradles";
import Works from "./pages/works";

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Cradles" element={<Cradles />} />
        <Route path="Works" element={<Works />} />
      </Routes>
    </div>
  )
}

export default App