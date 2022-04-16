import { useState } from "react";
import "../assets/Header.css";
const Header = ()=>{
    return (
        <div className="container">
            <div className="logo"><p>Logo</p></div>
            <div className="menu">
                <p>Patient</p>
                <p>Hospital</p>
            </div>
            <div className="wallet">
               <input type="button" className="walletBtn" value="Connect"></input>
            </div>
        </div>
    )
}
export default Header;