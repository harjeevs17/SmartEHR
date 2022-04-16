import logo from './logo.svg';
import { useEffect } from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './components/Homepage';
import LandingPage from './components/LandingPage';
import Patient from './pages/patient';
import Banner from './components/Banner';
import Header from "./components/Header";

function App() {
  
  return (
    <BrowserRouter>
        <Header/>
        <Routes>
        <Route path="/" element={ <LandingPage/> } />
        <Route path="patient" element={ <Patient/> } />
      </Routes>
    </BrowserRouter>
     
  );
}
// <Route path="*" element={<NoPage />} />
//<Route index element={<Home />} />
export default App;
