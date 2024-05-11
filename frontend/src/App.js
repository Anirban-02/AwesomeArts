import './App.css';
import Home from './Components/Home';
import About from './Components/About';
import Gallerynew from './Components/Gallerynew';
import {BrowserRouter ,Route,Routes} from 'react-router-dom';
import Buy from './Components/Buy';
import { AppProvider } from './context/productcontext';
import Navbar from './Components/Navbar';
import Contact from './Components/Contact';
import Prices from './Components/Prices';



function App() {
  return (
    <div>
      <AppProvider >
        <BrowserRouter >
          <div className='relative bg-primary w-full caret-transparent' >
            <Navbar/>
            <Home/>
            <About/>
            <Gallerynew/>
            <Prices/>
            <Buy/>
            <Contact/>
          </div>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;
