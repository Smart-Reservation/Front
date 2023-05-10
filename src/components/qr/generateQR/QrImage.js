import React, { useState } from "react";
import QRCode from "react-qr-code";
import styled from "styled-components";

const QRContainer = styled.div`
  display: flex;
  border: 10px sold black;
  padding: 5% 10%;
`;

// const Hider = styled.div`
//   display: "block";
//   background: "black";

//   margin: "5%";
//   width: "100%";
//   height: "100%";
//   padding: "5% 10%";
//   borderradius: "10px";
//   border: 1px solid black;
// `;

// const BtnHider = styled.div`
//   position: absolute;
//   border: 2px white solid;
//   color: white;
//   background-color: transparent;
//   font-size: 2em;

//   & :hover {
//     cursor: grab;
//   }
// `;

function QrImage({ valueForQr }) {
  const [isClicked, setisClicked] = useState(true);

  const onClick = () => {
    setisClicked(!isClicked);
  };

  const MakeQr = isClicked
    ? () => {
        return (
          <QRCode
            value={valueForQr}
            style={{
              background: "white",
              margin: "5%",
              width: "100%",
              padding: "0% 10%",
              borderRadius: "10px",
            }}
            size={500}
            // viewBox={`0 0 400 400`}
          />
        );
      }
    : () => {
        return "";
        //   <Hider>
        //     <BtnHider onClick={onClick}>Don't let other see it</BtnHider>
        //   </Hider>
      };

  // const HideQr=()=>{ return  (<div id="hider">
  //     <MakeQr />
  //     <button type="button" id="hider"> don't let others see it</button>
  // </div>)};

  return (
      <QRContainer>
        <MakeQr />

        {/* <HideQr /> */}
      </QRContainer>
  );
}

export default QrImage;
