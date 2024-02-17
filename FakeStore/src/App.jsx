import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Agregar from "./Agregar";
import logo from "./assets/logo.webp";

function App() {
  return (
    <Router>
      <nav className="sticky h-fit top-0 w-full z-50 bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center space-x-3">
            <img src={logo} className="h-10 rounded-full" alt="Logo fake store" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Fake Store</span>
          </a>
          <div className="flex items-center space-x-3">
            <Link to="/" className="text-gray-800 dark:text-white">Tienda</Link>
            <Link to="/agregar" className="text-gray-800 dark:text-white">Agregar</Link>
            <Link to="/carrito" className="text-gray-800 dark:text-white">Carrito</Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agregar" element={<Agregar />} />
      </Routes>
    </Router>
  );
}

export default App;

