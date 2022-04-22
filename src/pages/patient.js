import { useEffect, useState } from "react";
import "../assets/patient.css";
const Patient =(props)=>{
    
    const submitPatientData = (event)=>{
        event.preventDefault();
        props.contractV.setPatient(props.addressV,event.target.name.value,event.target.age.value,event.target.sex.value);
    }
    const [data,setData] = useState(null);
    useEffect(()=>{
        if(props.addressV!=null){
           props.contractV.getPatient(props.addressV).then((res)=>{
              if(res!=null){
                  if(res[0]!='0x0000000000000000000000000000000000000000'){
                    setData(res);
                  }
              }
           })
        }
       
    },[props.addressV])
    return(  
        <div className="container1">
            {data==null?<div className="insertPatient">
                <form onSubmit={submitPatientData} >
                <p>Insert a Patient</p>
                   <input id="name" type="text" placeholder="Name"/>
                   <input id="age" type="text" placeholder="Age"/>
                   <input id="sex" type="text" placeholder="Sex"/>
                   <input type="submit" value="Insert"/>
               </form>
           </div>:<div><p>Data is already inserted {data[1]}</p></div>}
        </div>
        
    )
}
export default Patient;