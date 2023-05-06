import Head from "../components/header/header";
import styled, { css } from "styled-components";
import QRCode from "../components/QRGen/qr";

const TotalContainer=styled.div`
  display:flex;
position: relative;
  height: 100vh;
  width: 100vw;
  background: #FFFFFF;
  border-radius: 20px;
`;
const LeftContainer=styled.div`
  width:60vw;
  background:#FFFFFF;
  padding: auto;
  `;

const RightContainer=styled.div`
border-Left:1px solid black

`;

const ReservationInfo= styled.div`
`;

const QrGen= styled.div`
`;


function ReservationDetailPage(){
  const value ='asdfa8aw8e013897fgv7asd8c87d128dbw08c8gsd0fgg123xe218exy231789xe21896ec9b868ce69cr6'
  //value에 값 전달하기 

  
  return (
  <>
    <Head />
    
<TotalContainer>

    <LeftContainer>
      <ReservationInfo />       
    </LeftContainer>
  

    <RightContainer/>
      <QRCode valueForQr={value}/>

    </TotalContainer>
    </>
)

}

export default ReservationDetailPage;