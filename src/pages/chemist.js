import { useEffect, useState } from "react";
import "../assets/chemist.css";
const Chemist = (props)=>{
    
    const [data,setData] = useState([]);
    const [addr,setAddr] = useState([]);
    const [medi,setMedi] = useState([]);
    useEffect(() => {
        getPost();
      }, []);
      const getPost = ()=>{
        let final = []
        let test = []
        let xx = []
        props.contractV.getPatientCount().then((res)=>{
            console.log("one");
            let num = parseInt(res);
            for(let i=1;i<=num;i++){
                var custom = new Object();
                props.contractV.getAllUserAddresses(i).then((addr)=>{
                    test.push(addr);
                })
                setAddr(test);
            }
        })
      }
      const process = ()=>{
        let fin = []
        addr.map((item)=>{
                let tempp=[]
                for(let j=0;j<1;j++){
                    props.contractV.getMedicineUsingPatientId(item,0).then((medi)=>{
                        console.log(medi.toString());
                        tempp.push(medi.toString())
                    })
                    setMedi(prevState => ({ medi: prevState.medi.push(tempp)}))
                }
                
        })
    }
    return (
        <div className="chemistBox">
            <div className="inner inner1">
                <p>Address : 0x036836aA003439a6eF46E65F158915De49b5F239 </p>
                <p>Medications : </p>
                <p>Paracetamol</p>
            </div>
            <div className="inner inner1">
                <p>Address : 0xF4A75c033A5Bc9f3dBB68BFecc82E8B00146A6cE </p>
                <p>Medications : </p>
                <p>Calcium</p>
            </div>
        </div>
    )
}
export default Chemist;