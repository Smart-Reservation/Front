import { useState } from "react";
import {
  useStoreInfoDispatch,
  useStoreInfoState,
} from "../../context/StoreInfoContext";
import Reservation from "./Reservation";
import styled from "styled-components";
import {
  useReservationInfoDispatch,
  useReservationInfoState,
} from "../../context/ReservationInfoContext";

//styled-component
const ReservationListContainer = styled.div`
  width: 30vw;
  height: ${(props) => (props.mode === "user" ? "200px" : "400px")};

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  overflow-y: scroll;

  background: #ffffff;
`;

function ReservationList({ mode, reservations }) {
  const [clickeds, setClickeds] = useState(
    Array(reservations.length).fill(false)
  );

  const onClick = (index) => {
    const newArr = Array(reservations.length).fill(false);
    newArr[index] = true;
    setClickeds(newArr);
  };

  return (
    <ReservationListContainer mode={mode}>
      {reservations.map((reservation, index) => (
        <Reservation
          key={index}
          mode={mode}
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
