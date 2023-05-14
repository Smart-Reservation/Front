import React from "react";
import styled from "styled-components";
import { useReservationInfoDispatch, useReservationInfoState } from "../../context/ReservationInfoContext";

const UpperInfo = styled.div`
  margin: 6em 0em 6em 5em;
  display: flex;
  justify-content: baseline;
  align-items: center;

  & > div {
    margin-left: 2em;
  }

  & > img {
    width: 15em;
    height: 15em;
  }
  & > div > p > span {
    font-weight: bold;
    font-size: 1em;
  }
`;

const DownInfo = styled.div`
  margin-left: 5em;

  & > p > span {
    font-weight: bold;
    font-size: 1em;
  }
`;

const BoldText=styled.div`
  width: 30em;
  height: 2em;

  margin-top:1em;
  margin-bottom:0.5em;

  font-family:'Pretendard-Regular';
  font-style: normal;
  font-weight: 700;
  font-size: 1.2em;
  line-height: 22px;
  color :black;
`;

const Text=styled.div`
  width: 17em;
  height: 3em;

  font-family:'Pretendard-Regular';
  font-style: normal;
  font-weight: 500;
  font-size: 1em;
  line-height: 1.5em;

  color: #484848;
`;


function ReservationDetail({store}) {
  const reservationState=useReservationInfoState();
  const reservationDispatch=useReservationInfoDispatch();


  // const store = information.store;
  let date =
    reservationState.selectedDate.year +
    "/" +
    reservationState.selectedDate.month +
    "/" +
    reservationState.selectedDate.day;

  let time=store.periodList[reservationState.currentSet.index];
  let numbers=reservationState.currentSet.numbers;

  return (
    <div>
      <UpperInfo>
        <img src={store.imgUrl} alt="사진" />
        <div>
          <section>
            <BoldText>{store.storeName}</BoldText>
          </section>
          <section>
            <Text>{store.location}</Text>
          </section>
          <section>
            <BoldText>Reservation Detail</BoldText> 
          </section>
          <section>
            <Text>{date} {time}</Text>
          </section>
        </div>
      </UpperInfo>
      <DownInfo>
        <section style={{ fontSize: "1.5em" }}>
          <BoldText>Price Detail</BoldText>
        </section>
        <Text>Each Price : {(store.deposit).toFixed(3)}BNB</Text>
        <Text>Number Of People : {numbers}</Text>
        <Text style={{fontWeight:"700"}}>Total : {(numbers * store.deposit).toFixed(3)}BNB</Text>
      </DownInfo>
    </div>
  );
}

export default ReservationDetail;
