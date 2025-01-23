import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Vans from './Pages/Vans';
import "./server"

function App() {
  return (
    <BrowserRouter>
      <header>
        <Link to="/" className='site-logo' >#VanCamp</Link>
        <nav>
          <Link to="/about" >About</Link>
          <Link to="/vans" >Vans</Link>
        </nav>
      </header>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/vans' element={<Vans />} />
      </Routes>
      <footer>© {new Date().getFullYear()} VanCamp. All rights reserved</footer>
    </BrowserRouter>
  );
}

export default App;
