import { useEffect, useState } from "react";
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
import ConfirmationWindow from "./ConfirmationWindow";

//styled-component
const ReservationListContainer = styled.div`
  width: 30vw;
  height: ${(props) => (props.mode === "user" ? "200px" : "400px")};

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ::-webkit-scrollbar {
    width: 1em;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: beige;
  }
  ::-webkit-scrollbar-track {
    background-color: white;
  }
  overflow-y: auto;

  background: #ffffff;
`;

function ReservationList({ mode, reservations}) {
  const [clickeds, setClickeds] = useState(
    Array(reservations?.length).fill(false)
  );
  const onClick = (index) => {
    const newArr = Array(reservations?.length).fill(false);
    newArr[index] = true;
    setClickeds(newArr);
  };
  useEffect(() => {
    setClickeds(Array(reservations?.length).fill(false));
  }, [reservations]);

  return (
    <ReservationListContainer mode={mode}>
      {reservations&&reservations.map((reservation, index) => (
        <Reservation
          key={index}
          mode={mode}
          onClick={onClick}
          // onClose={onClose}
          reservation={reservation}
          index={index}
          clicked={clickeds[index]}
        />
      ))}
    </ReservationListContainer>
  );
}

export default ReservationList;
