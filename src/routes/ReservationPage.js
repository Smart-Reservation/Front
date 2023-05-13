import PeriodList from "../components/period/PeriodList";
import ReservationList from "../components/reservation/ReservationList";
import Calender from "../components/calender/Calendar";
import {
  useStoreInfoState,
  useStoreInfoDispatch,
} from "../context/StoreInfoContext";
import styled from "styled-components";
import { useState } from "react";

import Header from "../components/header/Header";
import {
  useReservationInfoDispatch,
  useReservationInfoState,
} from "../context/ReservationInfoContext";
import { useNavigate } from "react-router";
import {
  useUserInfoDispatch,
  useUserInfoState,
} from "../context/UserInfoContext";
import { useEffect } from "react";

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
  justify-content: center;
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
  margin-left: 5em;
`;

const DecreaseBtn = styled.div`
  width: 3em;
  height: 3em;

  background: #ffa559;
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
    cursor: pointer;
  }

  &:active {
    background-color: #ff6000;
  }
`;

const IncreaseBtn = styled.div`
  width: 3em;
  height: 3em;

  background: #ffa559;
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
    cursor: pointer;
  }

  &:active {
    background-color: #ff6000;
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

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 900;
  font-size: 18px;
  line-height: 22px;

  color: black;
`;

const LabelText = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
`;

const ReservationBtn = styled.div`
  width: 13em;
  height: 2em;
  margin: 3em;
  margin-top: 0em;
  margin-left: 5em;

  background: #ff6000;
  border-radius: 23px;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 40px;

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

function ReservationPage() {
  const storeState = useStoreInfoState();
  const storeDispatch = useStoreInfoDispatch();
  const reservationState = useReservationInfoState();
  const reservationDispatch = useReservationInfoDispatch();
  const userState = useUserInfoState();
  const userDispatch = useUserInfoDispatch();
  const [number, setNumber] = useState(1);
  const [Index, setIndex] = useState(-1);
  const nav = useNavigate();
  const storeNameIndex = storeState.selectedId;
  let storeName;
  storeState.totalStore.map((i) => {
    if ((i.id = storeNameIndex)) storeName = i.storeName;
  });

  let possibleIdxs = reservationState.reservationList.find(
    (reservation) =>
      reservation.storeId === reservationState.selectedId &&
      JSON.stringify(reservation.date) ===
        JSON.stringify(reservationState.selectedDate)
  )?.possibleIdxList;

  let storePeriods = storeState.totalStore.find(
    (store) => store.id === storeState.selectedId
  ).periodList;

  const SelectDate = (date) => {
    reservationDispatch({
      type: "SELECT_DATE",
      date: date,
    });
  };
  const selectIndex = (Index) => {
    setIndex(Index);
    selectCurrentSet(Index); //추가
  };

  const selectCurrentSet = (index) => {
    reservationDispatch({
      type: "SELECT_CURRENT",
      set: {
        address: userState.address,
        numbers: number,
        index: index,
      },
    });
  };

  const AddReservation = (Index) => {
    selectCurrentSet(Index);
    reservationDispatch({
      type: "ADD_RESERVATION",
      reserved: reservationState.currentSet,
    });
    userDispatch({
      type: "ADD_USER_RESERVATION",
      reservation: {
        storeId: reservationState.selectedId,
        date: reservationState.selectedDate,
        numbers: reservationState.currentSet,
        index: Index,
      },
    });
    nav("/ReservationDetailPage");
  };

  return (
    <TotalContainer>
      <Header />
      <div className="StoreName">{storeName}</div>
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
            {storeState.totalStore.find(
              (store) => store.id === storeState.selectedId
            ).deposit * number.toFixed(3)}
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
