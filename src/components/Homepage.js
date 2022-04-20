import { useState } from "react";
import Abi from "../assets/abi.json";
import {ethers} from "ethers";
const Homepage = ()=>{
    
    const contractAddress = "0x371FDcB8E9d8Bb5f04CB8852C48cdb0574597F79";
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
    const getData =  async ()=>{
        let value = await contract.get1();
        setData(value);
    }
    const submitHandler = (event)=>{
        event.preventDefault();
        contract.set1(event.target.setData.value);
    }

    const submitPatientData = (event)=>{
        event.preventDefault();
        alert(address)
        contract.setPatient(address,event.target.name.value,event.target.age.value,event.target.sex.value);
    }
    const getUserData = ()=>{
        
    }
    
    
    return(
        <div>
            <p>Welcome to the first DAPP</p>
            {error!=null? <p>{error}</p> :null }
            <button onClick={connectWalletHandler()}>{connectedWallet}</button>
            {address!=null? <h3>Address is : {address}</h3>:null}
            <button onClick = {getData}>Get Data</button>
            {data!=null ? <p>{data}</p>:null}
            <form onSubmit={submitHandler}>
                <input id="setData" type="text"></input>
                <button type="submit">Submit Data to blockchain</button>
            </form>


            <p>Health Data</p>
            <form onSubmit={submitPatientData}>
                <input type="text" id="name"/>
                <input type="text" id="age"/>
                <input type="text" id="sex"/>
                <button type="submit">Submit Health Data</button>
            </form>
            <button onClick={getUserData}>Get Data</button>
            
                

        </div>
    )
}
export default Homepage;