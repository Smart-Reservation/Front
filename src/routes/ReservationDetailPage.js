import Header from "../components/header/Header";
import styled, { css } from "styled-components";
import QRCode from "../components/QRGen/qr";
import PrintInformation from "../components/reserveInfo/reserveInfo";

const OuterConTainer= styled.div`
  height:100vh;
  width:100vw;
`
const TotalContainer=styled.div`
  display:flex;
position: relative;
  margin: 3% 10%;
  width:80%;
  height:80vh;
  background: #E0E2E6;
  border: 1px solid black;
  border-radius: 20px;
  
`;
const LeftContainer=styled.div`
  width:55%;
  padding: auto;
  height:100%;
  padding:0px;
  `;

const RightContainer=styled.div`
  height:100%;
  padding:0px;
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
  <OuterConTainer>
    <Header />
    
<TotalContainer>

    <LeftContainer>
      <PrintInformation />
    </LeftContainer>
  

    <RightContainer>
      <QRCode valueForQr={value}/>
    </RightContainer>
    </TotalContainer>
    </OuterConTainer>
    </>
)

}

export default ReservationDetailPage;