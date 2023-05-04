import logo from './images/logo.png';
import './header.css';
import profile from './images/profile.png';
import profileBoss from './images/profile_boss.png';
import { useState } from 'react';
function Header(){
        const [active, setActive]=useState(false);
        let button;
        function alterner(){
                active?setActive(false)
                :setActive(true);

        }
        button= active?<div className='customerTog' ><img src={profile} /></div>:<div className='bossTog' ><img src={profileBoss} /></div> 


        return(<div className='top'>

                <div><img id="logo" src={logo} alt="logo"></img></div>

 
        <       div className='rightSide'>
        <       div>Download Mobile App</div>

                <button className='btnHeader' type='button'>Become A StoreManager </button>
                <button className='btnHeader' id="toggle" type='button' isActive={active} onClick={alterner} >
                             
                             
                             {button} </button> 

        
        </div></div>)
}

export default Header;                    