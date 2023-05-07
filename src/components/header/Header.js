import logo from './images/logo.png';
import './header.css';
import Profile from './images/profile.png';
import ProfileStore from './images/profile_boss.png';
import { useState } from 'react';
import login from '../Login';
import { Link } from 'react-router-dom';


function Header() {
        const [active, setActive] = useState(false);
        let button;
        function alterner() { active ? setActive(false) : setActive(true); }

        button = active ? <div className='bossTog' ><img src={ProfileStore} alt='profileStore'/></div> : <div className='customerTog' ><img src={Profile}  alt='profile'/></div>

        return (
                <div className='top'>
                        <Link to={'/'}><img id="logo" src={logo} alt="logo"></img></Link>
                        <div className='rightSide'>
                                <button className='btnHeader' id="btnOut" type='button' onClick={login}>Connect Binance Wallet
                                        <button className='btnHeader' id="toggle" type='button' isactive={active.toString()} onClick={alterner} >{button} </button>
                                </button>
                        </div>
                </div>
        )
}

export default Header;                    