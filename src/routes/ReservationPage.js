import PeriodList from "../components/period/PeriodList";
import ReservationList from "../components/reservation/ReservationList";
import Calender from "../components/calender/Calendar";
import UserAdd from "../components/reservation/icons/User_add.png";
import UserMinus from "../components/reservation/icons/User_minus.png";

import {
  useStoreInfoState,
  useStoreInfoDispatch,
} from "../context/StoreInfoContext";
import styled from "styled-components";
import { useEffect, useState } from "react";

import Header from "../components/header/Header";
import {
  useReservationInfoDispatch,
  useReservationInfoState,
} from "../context/ReservationInfoContext";
import { useNavigate } from "react-router";

import { useUserInfoDispatch, useUserInfoState } from "../context/UserInfoContext";
import axios from "axios";
import login from "../components/Login";

//styled-components
const TotalContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #ffffff;
  border-radius: 20px;

  & > .StoreName {
    font-weight: bold;
    font-size: 1.5em;
    margin: 2em 0em 0em 4em;
    padding: 0;
  }
`;

const LeftContainer = styled.div`
  float: left;
  width: 50%;
  height: 100%;
`;

const RightContainer = styled.div`
  float: right;
  width: 50%;
  height: 100%;
  display: flex; 
  flex-direction: column;
`;

const CalendarContainer = styled.div`
  margin: 3em;
  margin-top: 2em;

  margin-left: 6em;
`;

const PeriodContainer = styled.div`
  margin: 3em;
  margin-top: 2em;
`;
const NumberContainer = styled.div`
  margin: 3em;

  margin-top: 0px;
`;

const CoinContainer = styled.div`
  margin: 3em;
  margin-top: 0px;
`;

const NumberBtn = styled.div`
  width: 100%;
  display: flex;
  margin-top: 2em;
  margin-left: 14%;
`;

const DecreaseBtn = styled.div`
  width: 3em;
  height: 3em;

  background: rgba(255, 230, 199, 0.4);
  box-shadow: 0px 30px 84px rgba(0, 0, 0, 0.08),
    0px 8px 32px rgba(0, 0, 0, 0.07), 0px 3px 11px rgba(0, 0, 0, 0.03),
    0px 1px 3px rgba(0, 0, 0, 0.13);
  border-radius: 10px 0px 0px 10px;
  line-height: 40px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(255, 245, 199, 0.5);
    cursor: pointer;
  }

  &:active {
    background-color: rgba(255, 163, 0, 0.5);
  }
`;

const IncreaseBtn = styled.div`
  width: 3em;
  height: 3em;

  background: rgba(255, 230, 199, 0.4);
  box-shadow: 0px 30px 84px rgba(0, 0, 0, 0.08),
    0px 8px 32px rgba(0, 0, 0, 0.07), 0px 3px 11px rgba(0, 0, 0, 0.03),
    0px 1px 3px rgba(0, 0, 0, 0.13);
  border-radius: 0px 10px 10px 0px;
  line-height: 40px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(255, 245, 199, 0.5);
    cursor: pointer;
  }

  &:active {
    background-color: rgba(255, 163, 0, 0.5);
  }
`;

const NumberText = styled.div`
  width: 12em;
  height: 3em;

  line-height: 2em;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  background: #ffffff;
`;

const CoinText = styled.div`
  width: 10em;
  height: 2em;
  margin: 1em auto -1em 0em;

  font-family: 'Pretendard-Regular';
  font-style: normal;
  font-weight: 900;
  font-size: 18px;
  line-height: 22px;

  color: black;
`;

const LabelText = styled.div`
  font-family: 'Pretendard-Regular';
  font-style: normal;
  font-weight: 500;
  font-size: 1em;
  line-height: 24px;
`;

const ReservationBtn = styled.div`
  width: 13em;
  height: 2em;
  margin: 3em;
  margin-top: -1em;
  margin-left: 17%;

  background: #ff6000;
  border-radius: 23px;

  font-family: "Pretendard-Regular";
  font-style: normal;
  font-weight: 600;
  font-size: 1.3em;
  line-height: 2em;

  text-align: center;
  color: #ffffff;

  ${(props) =>
    props.index === -1
      ? `background-color:#ffe6c7;`
      : `
    &:hover {
      cursor:pointer;
    }

    &:active {
      background-color: #ffe6c7;
    }
  `}
`;
const ImgForBtn = styled.img`
  width: 2em;
  padding-top: 6px;
`;

function ReservationPage() {
  const storeState = useStoreInfoState();
  const reservationState = useReservationInfoState();
  const reservationDispatch = useReservationInfoDispatch();
  const userState = useUserInfoState();
  const userDispatch = useUserInfoDispatch();
  const [number, setNumber] = useState(1);
  const [Index, setIndex] = useState(-1);
  const nav = useNavigate();
<<<<<<< HEAD
  const storeNameIndex = storeState.selectedId;
  let storeName;
  storeState.totalStore.map((i) => {
    if ((i.id = storeNameIndex)) storeName = i.storeName;
  });

=======
  
>>>>>>> 4b0dbe518c4cc4a5aafb7700a288d8547ea58e75
  let impossibleIdxs = reservationState.reservationList.find(
    (reservation) =>
      reservation.storeId === reservationState.selectedId &&
      JSON.stringify(reservation.date) ===
        JSON.stringify(reservationState.selectedDate)
  )?.impossibleIdxList;

  let storePeriods = storeState.totalStore.find(
    (store) => store.id === storeState.selectedId
  )?.periodList;

  let possibleIdxs = storePeriods
    .map((period) => storePeriods.indexOf(period))
    .filter((idx) => !impossibleIdxs?.includes(idx));

  const SelectDate = (date) => {
    reservationDispatch({
      type:"ADD_DATE",
      date:date,
    })
  };
  const selectIndex = (Index) => {
    setIndex(Index);
<<<<<<< HEAD
    selectCurrentSet(Index); //추가
  };

  const selectCurrentSet = (index, number) => {
=======
    selectCurrentSet(Index);//추가
  }
  
  const selectCurrentSet= (address,index,number)=>{
>>>>>>> 4b0dbe518c4cc4a5aafb7700a288d8547ea58e75
    reservationDispatch({
      type: "SELECT_CURRENT",
      set: {
        address: address,
        numbers: number,
        index: index,
      },
    });
  };
<<<<<<< HEAD

  const AddReservation = (Index) => {
    reservationDispatch({
      type: "ADD_RESERVATION",
      reserved: reservationState.currentSet,
    });
    userDispatch({
      type: "ADD_USER_RESERVATION",
      reservation: {
        storeId: reservationState.selectedId,
        date: reservationState.selectedDate,
        numbers: number,
        index: Index,
      },
    });
    nav("/ReservationDetailPage");
=======
  const reservate=(address)=>{
    axios.post(`http://${process.env.REACT_APP_SERVER_HOST}/reservation/reservate`,{
      data:{
        storeId:reservationState.selectedId,
        address:address,
        time:reservationState.selectedDate.year+"-"+reservationState.selectedDate.month+"-"+reservationState.selectedDate.day+" "+storePeriods[Index],
        number:number
      }
    }).then((res) => {
      if(res.status===200){
        reservationDispatch({
          type: "ADD_RESERVATION",
          reserved: reservationState.currentSet,
        });
        userDispatch({
          type:'ADD_USER_RESERVATION',
          reservation:{
            storeId:reservationState.selectedId,
            date:reservationState.selectedDate,
            numbers:number,
            index:Index,
          }
        })
       nav("/ReservationDetailPage")
      }
      else{
        alert("Reservation Failed");
        nav("/ReservationPage")
      }
    })
  }

  const AddReservation = (Index) => {
    if(!userState.login){
      login().then((token)=>{
        axios.get(`http://${process.env.REACT_APP_SERVER_HOST}/reservation/list/personal/${token.address}`).then((res) => {
        userDispatch({ type: "LOGIN", address: token.address, coin: token.coin,reservationList: res.data });
        selectCurrentSet(token.address,Index,number);
        })
        reservate(token.address);
      })
    }else{
      selectCurrentSet(userState.address,Index,number);
      reservate(userState.address)
    }
    
    
>>>>>>> 4b0dbe518c4cc4a5aafb7700a288d8547ea58e75
  };

  return (
    <TotalContainer>
      <Header />
      <div className="StoreName" style={{fontFamily:'Pretendard-Regular'}}>{storeState.totalStore.find(store=>store.id===storeState.selectedId).storeName}</div>
      <LeftContainer>
        <CalendarContainer>
          <LabelText>Select a date :</LabelText>
          <Calender SelectDate={SelectDate} />
        </CalendarContainer>
      </LeftContainer>
      <RightContainer>
        <PeriodContainer>
          <LabelText>Select a period : </LabelText>
          {possibleIdxs && (
            <PeriodList
              mode="user"
              periods={possibleIdxs.map((index) => storePeriods[index])}
              selectIndex={selectIndex}
            />
          )}
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
                      selectCurrentSet(Index, number - 1);
                    }
              }
            >
              <ImgForBtn src={UserMinus} alt="subtract people"></ImgForBtn>
            </DecreaseBtn>
            <NumberText>{number}</NumberText>
            <IncreaseBtn
              onClick={() => {
                setNumber(number + 1);
                selectCurrentSet(Index, number + 1);
              }}
            >
              <ImgForBtn src={UserAdd} alt="add people"></ImgForBtn>
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
          index={Index}
          onClick={Index === -1 ? () => {} : () => AddReservation(Index)}
        >
          RESERVATION
        </ReservationBtn>
      </RightContainer>
    </TotalContainer>
  );
}

export default ReservationPage;
