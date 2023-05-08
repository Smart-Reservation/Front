import logo from './images/logo.png';
import './header.css';
import Profile from './images/profile.png';
import ProfileStore from './images/profile_boss.png';
import { useState } from 'react';
import login from '../Login';
import { Link } from 'react-router-dom';
import UserOption from "../user_option/UserOption";

function Header() {
  const [active, setActive] = useState(false);
  let button;
  function alterner() {
    active ? setActive(false) : setActive(true);
  }

  button = active ? <div className='bossTog' ><img src={ProfileStore} alt='profileStore'/></div> : <div className='customerTog' ><img src={Profile}  alt='profile'/></div>


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
      <Link to={'/'}><img id="logo" src={logo} alt="logo"></img></Link>
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
            isactive={active.toString()}
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