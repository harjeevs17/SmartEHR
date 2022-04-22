import logo from './logo.svg';
import { useEffect,useState } from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './components/Homepage';
import LandingPage from './components/LandingPage';
import Patient from './pages/patient';
import Banner from './components/Banner';
import Header from "./components/Header";
import Hospital from './pages/hospital';
import Abi from "./assets/abi.json";
import {ethers} from "ethers"
import {Link} from "react-router-dom";
import "./assets/Header.css";
import AddDetails from './pages/addDetails';
import Chemist from './pages/chemist';
function App() {

    const contractAddress = "0x1733cDC3Ebc95679E451ED3824654f3899eb1209";
    const [connectedWallet,setConnectedWallet] = useState("Connect wallet");
    const [error,setError] = useState(null);
    const [address,setAddress] = useState(null);
    const [funds,setFunds] = useState(null);
    const [data,setData] = useState(null);
    
    const [provider,setProvider] = useState(null);
    const [signer,setSigner] = useState(null);
    const [contract,setContract] = useState(null);

  const connectWalletHandler = ()=>{
    if(window.ethereum){
        window.ethereum.request({method:'eth_requestAccounts'})
        .then(result=>{
            setConnectedWallet("Wallet Connected");
            walletChangeHandler(result[0]);
        })
    }else{
        setError("Need to install Metamask");
    }
}
const walletChangeHandler = (account)=>{
    setAddress(account);
    updateEthers();
}
const updateEthers = ()=>{
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);
    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);
    let tempContract = new ethers.Contract(contractAddress,Abi,tempSigner);
    console.log(tempContract);
    setContract(tempContract);
}
const LinkStyle={
  color: "white",textDecoration: "none"
}

  return (
    <BrowserRouter>
        <div className="container">
            <div className="logo"><p>Logo</p></div>
            <div className="menu">
                <Link to="/patient" style={LinkStyle}>Patient</Link>
                <Link to="/hospital" style={LinkStyle}>Hospital</Link>
                <Link to="/chemist" style={LinkStyle}>Chemist</Link>
            </div>
            <div className="wallet">
               <input onClick = {connectWalletHandler} type="button" className="walletBtn" value={address!=null?address:"Connect wallet"}></input>
            </div>
        </div>
        <Routes>
        <Route path="/" element={ <LandingPage/> } />
        <Route path="patient" element={ <Patient contractV={contract} addressV={address}/> } />
        <Route path="hospital" element={ <Hospital  contractV={contract} addressV={address}/> } />
        <Route path="addDetails/:address" element={ <AddDetails  contractV={contract} addressV={address}/> } />
        <Route path="chemist" element={ <Chemist  contractV={contract} addressV={address}/> } />
      </Routes>
    </BrowserRouter>
     
  );
}
// <Route path="*" element={<NoPage />} />
//<Route index element={<Home />} />
export default App;
