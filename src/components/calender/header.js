import logo from './logo.png';
import './header.css';
import Button from './button'
import buttonIcon from './menuIcon.png';

function Head(){
   return(<div className='top'>

        <div><img src={logo} alt="logo"></img></div>

 
        <div className='rightSide'>
        <div>Download Mobile App</div>

        <Button contents="Become A StoreManager" style={{ padding:'0.8em'}}/>
        <Button imageUrl={<img src={buttonIcon} />} style={{ padding: '0.8em' }} /> 
        </div></div>)
}

export default Head;               