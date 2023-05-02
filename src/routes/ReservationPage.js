import PeriodList from "../components/PeriodList";
import Calender from "../components/calender/Calendar";
import { useReservationInfoState, useReservationInfoDispatch } from '../context/ReservationInfoContext';
import styled, { css } from "styled-components";
import { useState } from "react";

//styled-components
const TotalContainer=styled.div`
  /* reservation form_user */


  position: relative;
  width: 1366px;
  height: 1339px;

  background: #FFFFFF;
  border-radius: 20px;
`;

const LeftContainer=styled.div`
`;

const RightContainer=styled.div`
`;

const DecreaseBtn=styled.div`
  /* Rectangle 59 */


  position: absolute;
  width: 48px;
  height: 48px;
  left: 791px;
  top: 444px;

  background: #E0E2E6;
  box-shadow: 0px 30px 84px rgba(0, 0, 0, 0.08), 0px 8px 32px rgba(0, 0, 0, 0.07), 0px 3px 11px rgba(0, 0, 0, 0.03), 0px 1px 3px rgba(0, 0, 0, 0.13);
  border-radius: 10px 0px 0px 10px;
  line-height:40px;
  display:flex;
  text-align:center;
  align-items:center;
  justify-content: center;

  &:active {
    background-color: rgba(190, 190, 191, 0.9);
  }
`;

const IncreaseBtn=styled.div`
  /* Rectangle 58 */


  position: absolute;
  width: 48px;
  height: 48px;
  left: 1063px;
  top: 444px;

  background: #E0E2E6;
  box-shadow: 0px 30px 84px rgba(0, 0, 0, 0.08), 0px 8px 32px rgba(0, 0, 0, 0.07), 0px 3px 11px rgba(0, 0, 0, 0.03), 0px 1px 3px rgba(0, 0, 0, 0.13);
  border-radius: 0px 10px 10px 0px;
  line-height:40px;
  display:flex;
  text-align:center;
  align-items:center;
  justify-content: center;

  &:active {
    background-color: rgba(190, 190, 191, 0.9);
  }
`;

const NumberText=styled.div`
  position: absolute;
  width: 224px;
  height: 48px;
  left: 839px;
  top: 444px;

  text-align:center;
  background: #FFFFFF;

  line-height:40px;
  display:flex;
  text-align:center;
  align-items:center;
  justify-content: center;
`;

const CoinText=styled.div`
  position: absolute;
  width: 188px;
  height: 27px;
  left: 791px;
  top: 561px;

  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;

  color: #9A9A9A;
`;

const LabelText1=styled.div`
`;
const LabelText2=styled.div`
  position: absolute;
  width: 132px;
  height: 35px;
  left: 780px;
  top: 137px;

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  /* or 171% */

  text-align: center;
`;
const LabelText3=styled.div`
  position: absolute;
  width: 196px;
  height: 35px;
  left: 783px;
  top: 410px;

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;

  text-align: center;
`;
const LabelText4=styled.div`
  position: absolute;
  width: 90px;
  height: 35px;
  left: 785px;
  top: 533px;

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  /* or 171% */

  text-align: center;
`;

const ReservationBtn=styled.div`
  position: absolute;
  width: 328px;
  height: 46px;
  left: 792px;
  top: 630px;

  background: #484848;
  border-radius: 23px;

  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 40px;

  text-align: center;
  color: #FFFFFF;

  &:active {
    background-color: rgba(195, 195, 200, 1);
  }
`
const ReservationText=styled.div`
  position: absolute;
  width: 179px;
  height: 23px;


  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;

  text-align: center;
  // color: #FFFFFF;
`

function ReservationPage(){
  const state = useReservationInfoState();
  const dispatch = useReservationInfoDispatch(); 
  const [number, setNumber] = useState(1);

  return(
    <TotalContainer>
      <LeftContainer>
        <Calender />
      </LeftContainer>
      <RightContainer>
        <>
          <LabelText2>Select a period : </LabelText2>
          <PeriodList 
            periods={state.totalStore.find(store => store.id === state.selectedId).periodList} 
            //periods={[{startTime:"10:00",endTime:"11:00"}]}
          />
        </>
        <>
          <LabelText3>Select number of people :</LabelText3>
          <DecreaseBtn onClick={
            number <= 1 ? ()=>{} : ()=>{setNumber(number-1);}}>-</DecreaseBtn>
          <NumberText>{number}</NumberText>
          <IncreaseBtn onClick={()=>{setNumber(number+1);}}>+</IncreaseBtn>
        </>
        <>
          <LabelText4>Price Coin :</LabelText4>
          <CoinText>{((state.totalStore.find(store => store.id === state.selectedId).deposit)*number).toFixed(3)}BNB</CoinText>
        </>
        <ReservationBtn>
          {/* <ReservationText> */}
            RESERVATION
            {/* </ReservationText> */}
        </ReservationBtn>
      </RightContainer>
    </TotalContainer>
  )
}

export default ReservationPage;