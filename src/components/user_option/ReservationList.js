import { useState } from "react";
import { useStoreInfoDispatch, useStoreInfoState } from "../../context/StoreInfoContext";
import Reservation from "./Reservation";
import styled from "styled-components";
import { useReservationInfoDispatch, useReservationInfoState } from "../../context/ReservationInfoContext";

//styled-component
const ReservationListContainer=styled.div`
  width: 30vw;
  height: 200px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  overflow-y: scroll;

  background: #ffffff;
  // box-shadow: 0px 30px 84px rgba(19, 10, 46, 0.08),
  //   0px 8px 32px rgba(19, 10, 46, 0.07), 0px 3px 14px rgba(19, 10, 46, 0.03),
  //   0px 1px 3px rgba(19, 10, 46, 0.13);
  // border-radius: 8px;
`;

function ReservationList({ reservations }) {
  const [clickeds, setClickeds] = useState(Array(reservations.length).fill(false));

  const onClick = (index) => {
    const newArr = Array(reservations.length).fill(false);
    newArr[index] = true;
    setClickeds(newArr);
  };

  return (
    <ReservationListContainer>
      {reservations.map((reservation, index) => (
        <Reservation
          onClick={onClick}
          reservation={reservation}
          index={index}
          clicked={clickeds[index]}
        />
      ))}
    </ReservationListContainer>
  );
}

export default ReservationList;