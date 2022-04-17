import "../assets/hospital.css";

const hospital =()=>{
    return (
        <div class="hospitalContainer">
            <div class="item">
                <p>Patient Name</p>
                <p>Age</p>
                <p>Sex</p>
                <div class="innerBtns">
                    <input type="button" value="View"/>
                    <input type="button" value="Edit"/>
                </div>
            </div>
        </div>
    )
}

export default hospital;