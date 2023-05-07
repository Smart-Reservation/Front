import { useState } from "react";
import { useStoreInfoDispatch, useStoreInfoState } from "../context/StoreInfoContext";
import Reservation from "./Reservation";
import styled from "styled-components";

//styled-component
const ReservationListContainer=styled.div``;

function ReservationList({ reservations }) {
  const state = useStoreInfoState();
  const dispatch = useStoreInfoDispatch();
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