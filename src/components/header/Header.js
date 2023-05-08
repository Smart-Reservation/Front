import logo from "./images/logo.png";
import "./header.css";
import profile from "./images/profile.png";
import profileBoss from "./images/profile_boss.png";
import { useEffect, useState } from "react";
import login from '../Login';
import UserOption from "../user_option/UserOption";
function Header() {
  const [active, setActive] = useState(false);
  let button;
  function alterner() {
    active ? setActive(false) : setActive(true);
  }

  button = active ? (
    <div className="bossTog">
      <img src={profileBoss} />
    </div>
  ) : (
    <div className="customerTog">
      <img src={profile} />
    </div>
  );
  const [logged, setlogged]=useState(false); //전역적으로 관리
  const [clicked,setClicked]=useState(false);

  const onClick=()=>{
    setClicked((clicked)=>!clicked);
  }
  const loggedIn=()=>{
    login();
    setlogged(true);
  }
  return (
    <div className="top">
      <div>
        <img id="logo" src={logo} alt="logo"></img>
      </div>
      <div className="rightSide">
        <button className="btnHeader" id="btnOut" type="button" >
          <div 
            className="btnHeader"
            id="wallet"
            onClick={logged?onClick: loggedIn}>Connect Binance Wallet</div>
          <button
            className="btnHeader"
            id="toggle"
            type="button"
            isActive={active}
            onClick={alterner}
          >
            {button}{" "}
          </button>
        </button>
      </div>
      {clicked?<UserOption/>:<></>}  
    </div>
  );
}

export default Header;                    