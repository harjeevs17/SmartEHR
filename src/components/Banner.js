import "../assets/Banner.css"; 
import mainLogo from '../assets/healthNew.png';

const Banner = ()=>{
    return(
        <div className="containerBanner">
            <div className="left">
                <p>Own your data by <span>securing</span> it on the blockchain</p>
                <div className="bannerBtns">
                    <input type="button" value="Explore"/>
                    <input type="button" value="Know More"/>
                </div>
            </div>
            <div className="right">
            <img  src={mainLogo}  alt="fireSpot"/>
            </div>

        </div>
    )
}
export default Banner;