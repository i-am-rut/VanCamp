import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
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
import AddHostVan from './Pages/Host/AddHostVan';
import HostVanDetails from './Pages/Host/HostVanDetails';
import HostVanDetailsInfo from './Pages/Host/HostVanDetailsInfo';
import HostVanDetailsPhotos from './Pages/Host/HostVanDetailsPhotos';
import HostVanDetailsPrice from './Pages/Host/HostVanDetailsPrice';
import Booking from './Pages/Booking';
import Logout from './Pages/Logout';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='vans' element={<Vans />} />
          <Route path='vans/:id' element={<VanDetails />} />
          <Route path='host' element={<HostLayout />} >
            <Route index element={<Dashboard />} />
            <Route path='income' element={<Income />} />
            <Route path='vans' element={<HostVans />} />
            <Route path='vans/create-van' element={<AddHostVan />} />
            <Route path='vans/:id' element={<HostVanDetails />} >
              <Route index element={<HostVanDetailsInfo />} />
              <Route path='price' element={<HostVanDetailsPrice />} />
              <Route path='photos' element={<HostVanDetailsPhotos />} />
            </Route>
            <Route path='reviews' element={<Reviews />} />
          </Route>
          <Route path='login' element={<Login />} />
          <Route path='logout' element={<Logout />} />
          <Route path='signup' element={<Signup />} />
          <Route path='booking/:id' element={<Booking />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
