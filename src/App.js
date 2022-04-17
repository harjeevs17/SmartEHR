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

function App() {

    const contractAddress = "0x073Bb80799b7c98cC5Ae7625fc5155fd4afdf56e";
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
    setContract(tempContract);
}


  return (
    <BrowserRouter>
        <Header setAddressV = {setAddress} setConnectedWalletV = {setConnectedWallet} setContractV = {setContract} contractAddressV = {contractAddress} setProviderV = {setProvider} setSignerV = {setSigner} addressV = {address}/>
        <Routes>
        <Route path="/" element={ <LandingPage/> } />
        <Route path="patient" element={ <Patient/> } />
        <Route path="hospital" element={ <Hospital/> } />
      </Routes>
    </BrowserRouter>
     
  );
}
// <Route path="*" element={<NoPage />} />
//<Route index element={<Home />} />
export default App;
