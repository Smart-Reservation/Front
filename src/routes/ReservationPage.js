import PeriodList from "../components/PeriodList";
import ReservationList from "../components/ReservationList";
import Calender from "../components/calender/Calendar";
import {
  useStoreInfoState,
  useStoreInfoDispatch,
} from "../context/StoreInfoContext";
import styled, { css } from "styled-components";
import { useState } from "react";

import Header from "../components/header/Header";
import {
  useReservationInfoDispatch,
  useReservationInfoState,
} from "../context/ReservationInfoContext";

//styled-components
const TotalContainer = styled.div`
  position: relative;
  width:100vw;
  height:100vh;
  background: #ffffff;
  border-radius: 20px;
`;

const LeftContainer = styled.div`
  float:left;
  width:50%;
  height:100%;
`;

const RightContainer = styled.div`
  float:right;
  width:50%;
  height:100%;
  display:flex;
  flex-direction: column;
`;

const CalendarContainer=styled.div`
  margin:30px;
  margin-left:100px;
`;

const PeriodContainer=styled.div`
  margin:30px;
`;
const NumberContainer=styled.div`
  margin:30px;
  margin-top:0px;
`;

const CoinContainer=styled.div `
  margin:30px;
  margin-top:0px;`;

const NumberBtn=styled.div`
  width:100%;
  display:flex; 
  margin-top:20px;
`;

const DecreaseBtn = styled.div`
  width: 48px;
  height: 48px;

  background: #e0e2e6;
  box-shadow: 0px 30px 84px rgba(0, 0, 0, 0.08),
    0px 8px 32px rgba(0, 0, 0, 0.07), 0px 3px 11px rgba(0, 0, 0, 0.03),
    0px 1px 3px rgba(0, 0, 0, 0.13);
  border-radius: 10px 0px 0px 10px;
  line-height: 40px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;

  &:active {
    background-color: rgba(190, 190, 191, 0.9);
  }
`;

const IncreaseBtn = styled.div`
  width: 48px;
  height: 48px;

  background: #e0e2e6;
  box-shadow: 0px 30px 84px rgba(0, 0, 0, 0.08),
    0px 8px 32px rgba(0, 0, 0, 0.07), 0px 3px 11px rgba(0, 0, 0, 0.03),
    0px 1px 3px rgba(0, 0, 0, 0.13);
  border-radius: 0px 10px 10px 0px;
  line-height: 40px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;

  &:active {
    background-color: rgba(190, 190, 191, 0.9);
  }
`;

const NumberText = styled.div`
  width: 224px;
  height: 48px;

  line-height: 40px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  background: #ffffff;
`;

const CoinText = styled.div`
  width: 188px;
  height: 27px;

  margin-top:20px;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;

  color: #9a9a9a;
`;

const LabelText = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
`;

const ReservationBtn = styled.div`
  width: 328px;
  height: 46px;
  margin:30px;
  margin-top:0px;

  
  border-radius: 23px;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 40px;

  text-align: center;
  color: #ffffff;

  &:active {
    background-color: rgba(195, 195, 200, 1);
  }
`;
const ReservationText = styled.div`
  width: 179px;
  height: 23px;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;

  text-align: center;
`;

function ReservationPage() {
  const storeState = useStoreInfoState();
  const storeDispatch = useStoreInfoDispatch();
  const reservationState = useReservationInfoState();
  const reservationDispatch = useReservationInfoDispatch();
  const [number, setNumber] = useState(1);
  const [Index, setIndex]=useState(-1);

  let possibleIdxs = reservationState.reservationList.find(
    (reservation) =>
      reservation.storeId === reservationState.selectedId &&
      JSON.stringify(reservation.date) ===
        JSON.stringify(reservationState.selectedDate)
  ).possibleIdxList;

  let storePeriods = storeState.totalStore.find(
    (store) => store.id === storeState.selectedId
  ).periodList;

  const SelectDate=(date)=>{
    reservationDispatch({
      type: 'SELECT_DATE',
      date:date
    })
  }
  const selectIndex=(Index)=>{
    setIndex(Index);
  }
  const AddReservation=(Index)=>{
    reservationDispatch({
      type: 'ADD_RESERVATION',
      reservedIdx:Index
    })
  };

  
  return (
    <TotalContainer>
      <Header />
      <LeftContainer>
        <CalendarContainer>
          <LabelText>Select a date : </LabelText>
          <Calender SelectDate={SelectDate} />
        </CalendarContainer>
      </LeftContainer>
      <RightContainer>
        <PeriodContainer>
          <LabelText>Select a period : </LabelText>
          {/* <PeriodList 
            periods={state.totalStore.find(store => store.id === state.selectedId).periodList} 
            //periods={[{startTime:"10:00",endTime:"11:00"}]}
          /> */}
          <PeriodList
            periods={possibleIdxs.map((index) => storePeriods[index])}
            selectIndex={selectIndex}
          />
        </PeriodContainer>
        <NumberContainer>
          <LabelText>Select number of people :</LabelText>
          <NumberBtn>
            <DecreaseBtn
              onClick={
                number <= 1
                  ? () => {}
                  : () => {
                      setNumber(number - 1);
                    }
              }
            >
              -
            </DecreaseBtn>
            <NumberText>{number}</NumberText>
            <IncreaseBtn
              onClick={() => {
                setNumber(number + 1);
              }}
            >
              +
            </IncreaseBtn>
          </NumberBtn>
        </NumberContainer>
        <CoinContainer>
          <LabelText>Price Coin :</LabelText>
          <CoinText>
            {(
              storeState.totalStore.find(
                (store) => store.id === storeState.selectedId
              ).deposit * number
            ).toFixed(3)}
            BNB
          </CoinText>
        </CoinContainer>
        <ReservationBtn
          onClick={()=>{AddReservation(Index)}}
        >
          {/* <ReservationText> */}
          RESERVATION
          {/* </ReservationText> */}
        </ReservationBtn>
      </RightContainer>
    </TotalContainer>
  );
}

export default ReservationPage;
