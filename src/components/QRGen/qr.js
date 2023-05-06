import React, { useState } from "react";
import './qr.css'
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";



function QR ({valueForQr}){
    const [isCliked, setisCliked]= useState(false);
    const onClick =()=>{
        setisCliked(true)
    }


    const MakeQr= isCliked ? ()=>{return (<QRCode value={valueForQr} style={{background: 'white',
margin:"10% 0 0 0 ", width:"100%" ,padding:"0"}} size={512} viewBox={`0 0 512 512`} />)
    }: 
    ()=>{return (<div id="hider"> <button type="button" id="btnHider"
     onClick={onClick}>Don't let other see your QR</button></div>)}

    // const HideQr=()=>{ return  (<div id="hider"> 
    //     <MakeQr />
    //     <button type="button" id="hider"> don't let others see it</button>
    // </div>)};
    
 
    return(
        <div>
        <div className="qrContainer" >
        
        <MakeQr/>
        
        {/* <HideQr /> */}

        </div>

        </div>
    )
}

export default QR;