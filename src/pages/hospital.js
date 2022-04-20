import { useState } from "react";
import "../assets/hospital.css";


const Hospital =(props)=>{
    const [pdata,setPdata] = useState([]);

    useState(()=>{
        props.contractV.getPatientCount().then((res)=>{
            console.log(res.toString());
            if(parseInt(res.toString())>0){
                let data = [];
                let idx = parseInt(res.toString());
                console.log("idx"+idx);
                for(let i=1;i<=idx;i++){
                    props.contractV.getPatientUsingIndex(i).then((res1)=>{
                        console.log(res1)
                        data.push(res1[1]);
                    })    
                }
                async function fetchData() {
                    await setPdata(data);
                  }
                fetchData();
            }
        })
       
    },[]);
    
    return (
        <div className="hospitalContainer">
            {pdata!=null?<p>{pdata[1]}</p>:<p>hi</p>}
            
        </div>
    )
}

export default Hospital;