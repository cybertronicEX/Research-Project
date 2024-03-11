import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './Components/Home';
import FashionProfiler from './Components/FashionProfiler/FashionProfiler';
import DataExtraction from './Components/DataExtraction/DataExtraction';
import Navbar from './NavBar/NavBar';

function App() {
  return (
    <>
      <div className="header">
        <Navbar />
        <div className='Rname1'>
          <h1 >Fashion Something</h1>
        </div>
      </div>
      {/* enter ur page routes here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fashionProfiler" element={<FashionProfiler />} />
        <Route path="/dataExtraction" element={<DataExtraction />} />
      </Routes>
    </>
  );
}

export default App;
