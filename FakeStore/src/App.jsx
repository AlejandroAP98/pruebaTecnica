import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Agregar from "./Agregar";
import logo from "./assets/logo.webp";
import Carrito from "./Carrito";


function App() {
  return (
    <Router>
      <header className="sticky h-fit top-0 w-full z-10 border-gray-200 bg-gray-900">
        <nav>
          <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
            <a href="#" className="flex items-center space-x-3">
              <img src={logo} className="md:h-10 h-8 rounded-full" alt="Logo fake store" />
              <span className="self-center md:text-2xl font-semibold whitespace-nowrap text-white">Fake Store</span>
            </a>
            <div className="flex items-center space-x-3">
              <Link to="/" className=" font-bold  text-sky-200">Tienda</Link>
              <Link to="/agregar" className=" font-light  text-white">Agregar</Link>
              <Link to="/carrito" className="font-light text-white">Carrito</Link>
            </div>
          </div>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agregar" element={<Agregar />} />
        <Route path="/carrito" element={<Carrito />} />
      </Routes>
    </Router>
  );
}

export default App;

