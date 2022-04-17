import "../assets/patient.css";
const Patient =()=>{
    return(  
        <div class="insertPatient">
                <form>
                <p>Insert a Patient</p>
                   <input id="name" type="text"/>
                   <input id="age" type="text"/>
                   <input id="sex" type="text"/>
                   <input type="submit" value="Insert"/>
               </form>
           </div>
    )
}
export default Patient;