import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import "../assets/addDetails.css";
const AddDetails = (props)=>{
    const location = useLocation()
    const [userAddress,setuserAddress] = useState(null);
    const [diseaseData,setDiseaseData] = useState([]);
    const [work,setWork] = useState([]);
    const [temp,setTemp] = useState([]);
    useEffect(()=>{
        const { state } = location.state
       setuserAddress(location.state.address);
       getRecords();
    },[userAddress])
    const submitHandler = (event)=>{
        event.preventDefault();
        props.contractV.setRecord(userAddress,event.target.diseaseName.value,event.target.medication.value,event.target.date.value)
    }
    const getRecords = async ()=>{
        if(userAddress!=null){
            props.contractV.getRecordCountForUser(userAddress).then((res)=>{
                let dataD = [];
                for(let i=0;i<parseInt(res);i++){
                   props.contractV.getRecords(userAddress,i).then((res1)=>{
                      let temp = {
                            'Id':res1[0],
                            'Disease':res1[1],
                            'Medicine':res1[2],
                            'Date':res1[3]
                        }
                        dataD.push(temp);
                   }).then(()=>{
                    setDiseaseData([...diseaseData,JSON.stringify(dataD)])  
                })
               }
            })
        }
    }
    const handler = ()=>{
        let x = JSON.parse(JSON.stringify(diseaseData[0]))
        console.log(JSON.parse(x))
        setWork(JSON.parse(x))
    }
    console.log("Disease"+diseaseData)
    return (
        <div className="" style={{textAlign:"center"}}>
            <input type="button" onClick={handler} value="show" className="showBox"/>
            <div className="recordsBlock containerAddDetails">
                {work!=null?
                  work.map((item)=>{
                      return (
                          <div className="inner1">
                            <p>{"Disease diagnosed : " + item.Disease}</p>
                            <p>{"Medicine Given : " + item.Medicine}</p>
                        </div>
                  )})  
                :""}
            </div>

            {userAddress!=null?
                <div className="containerAddDetails">
                    <p>Adding data for {userAddress}</p>
                    <form onSubmit={submitHandler}>
                    <input type="text" id="diseaseName" placeholder="Disease Name"/>
                    <input type="text" id="medication" placeholder="Medicine given"/>
                    <input type="text" id="date" placeholder="Date of diagnosis"/>
                    <input  type="submit" placeholder= "Submit Details"/>
                    </form>
                </div>
        :""}
        </div>
       
    )
}
export default AddDetails;