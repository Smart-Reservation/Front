import logo from './images/logo.png';
import './header.css';
import profile from './images/profile.png';
import profileBoss from './images/profile_boss.png';
import { useState } from 'react';


function Head(){
        const [active, setActive]=useState(false);
        let button;
        function alterner(){
                active?setActive(false)
                :setActive(true);
        }
        
        button= active?<div className='bossTog' ><img src={profileBoss} /></div> :<div className='customerTog' ><img src={profile} /></div>


        return(<div className='top'>

                <div><img id="logo" src={logo} alt="logo"></img></div>

 
        <       div className='rightSide'>

                <button className='btnHeader' id="btnOut" type='button'>Connect Binance Wallet 
                <button className='btnHeader' id="toggle" type='button' isActive={active} onClick={alterner} >{button} </button>
                </button>
                 

        
        </div></div>)
}

export default Head;                    