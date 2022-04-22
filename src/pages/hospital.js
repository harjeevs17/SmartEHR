import { useState , useEffect} from "react";
import "../assets/hospital.css";
import {Link} from "react-router-dom";


const Hospital =(props)=>{
    
    const [pdata,setPdata] = useState([]);
    const [work,setWork] = useState([]);
    const [temp,setTemp] = useState([]);
    const [show,setShow] = useState(true);
    
    const getResults = ()=>{
        props.contractV.getPatientCount().then((res)=>{
            console.log(res.toString());
            if(parseInt(res.toString())>0){
                let data = [];
                let idx = parseInt(res.toString());
                console.log("idx"+idx);
                for(let i=1;i<=idx;i++){
                    props.contractV.getPatientUsingIndex(i).then((res1)=>{
                        let temp = {
                            'address':res1[0],
                            'name':res1[1],
                            'age':res1[2],
                            'sex':res1[3]
                        }
                        data.push(temp);
                    }).then(()=>{
                        setPdata([...pdata,JSON.stringify(data)])  
                    })
                     
                }
            }
        })
        }
    useEffect(()=>{
        getResults()
      

    },[])

    const tester = ()=>{
        let res = JSON.parse(JSON.stringify(pdata))
        setWork(pdata)
        if(work!=null && work[0]!=null){
            let d = JSON.parse(work[0])
            setTemp(d)
            console.log("temp",temp)
        }
        setShow(false)
    }

    return (
        <div className="hospitalContainer">
            <p className="pHeading">View Patient Data</p>
            <input type="button" onClick = {tester} value="fetch data" className="fetchBtn"/>
            <div className="hospitalContainer">
                {temp!=null ? temp.map((item,key)=>{
                    return <div className="inner" key={key}>
                        <p>{"Address : " + item.address}</p>
                        <p>{"Name : " + item.name}</p>
                        <p>{"Age : " + item.age}</p>
                        <p>{"Sex "  + item.sex}</p>
                        <Link to="/addDetails/addressvalue" state={{address:item.address}} style={{color:"blue",textDecoration:"none"}}>Add details</Link>
                    </div>
                }):<p>No data</p>}
            </div>
        </div>
    )
}

export default Hospital;