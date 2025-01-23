import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Vans from './Pages/Vans/Vans';
import "./server"
import VanDetails from './Pages/Vans/VanDetails';
import Layout from './Components/Layout'
import Dashboard from './Pages/Host/Dashboard';
import Income from './Pages/Host/Income';
import Reviews from './Pages/Host/Reviews';
import HostLayout from './Components/HostLayout';
import HostVans from './Pages/Host/HostVans';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/vans' element={<Vans />} />
          <Route path='/vans/:id' element={<VanDetails />} />
          <Route path='/host' element={<HostLayout />} >
            <Route path='/host/dashboard' element={<Dashboard />} />
            <Route path='/host/income' element={<Income />} />
            <Route path='/host/vans' element={<HostVans />} />
            <Route path='/host/reviews' element={<Reviews />} />
          </Route>
        </Route>
      </Routes>
      <footer>© {new Date().getFullYear()} VanCamp. All rights reserved</footer>
    </BrowserRouter>
  );
}

export default App;
