import { useState } from "react";
import { Link } from "react-router-dom";
import Abi from "../assets/abi.json";
import {ethers} from "ethers"

import "../assets/Header.css";
const Header = (props)=>{
    const LinkStyle={
        color: "white",textDecoration: "none"
    }
    const connectWalletHandler = ()=>{
        if(window.ethereum){
            window.ethereum.request({method:'eth_requestAccounts'})
            .then(result=>{
                props.setConnectedWalletV("Wallet Connected");
                walletChangeHandler(result[0]);
            })
        }else{
            alert("Need to install metamask");
        }
    }
    const walletChangeHandler = (account)=>{
        props.setAddressV(account);
        updateEthers();
    }
    const updateEthers = ()=>{
        let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
        props.setProviderV(tempProvider);
        let tempSigner = tempProvider.getSigner();
        props.setSignerV(tempSigner);
        let tempContract = new ethers.Contract(props.contractAddress,Abi,tempSigner);
        console.log("hii");
        console.log(tempContract);
        props.setContractV(tempContract);
    }
    return (
        <div className="container">
            <div className="logo"><p>Logo</p></div>
            <div className="menu">
                <Link to="/patient" style={LinkStyle}>Patient</Link>
                <Link to="/hospital" style={LinkStyle}>Hospital</Link>
                <Link to="/chemist" style={LinkStyle}>Chemist</Link>
            </div>
            <div className="wallet">
               <input onClick = {connectWalletHandler} type="button" className="walletBtn" value={props.addressV!=null?props.addressV:"Connect wallet"}></input>
            </div>
        </div>
    )
}
export default Header;