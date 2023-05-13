import styled from "styled-components";
import { useReservationInfoState } from "../../context/ReservationInfoContext";
import { useStoreInfoState } from "../../context/StoreInfoContext";

//styled-components

const Container = styled.div`
  width: 100%;
  &:hover {
    cursor: pointer;
  }
`;
const ContentBox = styled.div`
  height: 32px;

  display: flex;
  padding: 4px 16px;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;

  align-items: center;
  justify-content: center;
  color: ${(props) =>
    props.mode === "user" &&
    props.reservedTimes.find((time) => time === props.period)
      ? "gray"
      : "black"};

  background: ${(props) => (props.clicked ? "#FFE6C7" : "white")};

  ${(props) =>
    props.clicked
      ? ""
      : `&:hover {
    background-color: beige;
  }`}
`;

function Period({ mode, period, onClick, clicked }) {
  const storeState = useStoreInfoState();
  const reservationState = useReservationInfoState();
  const reservedTimes = reservationState.reservationList
    .find(
      (reservation) =>
        reservation.storeId === reservationState.selectedId &&
        JSON.stringify(reservation.date) ===
          JSON.stringify(reservationState.selectedDate)
    )
    .reservedList.map(
      (reserved) =>
        storeState.totalStore.find(
          (store) => store.id === storeState.selectedId
        ).periodList[reserved.index]
    );

  return (
    <Container onClick={onClick}>
      <ContentBox
        mode={mode}
        reservedTimes={reservedTimes}
        period={period}
        clicked={clicked}
      >
        {period}
      </ContentBox>
    </Container>
  );
}
export default Period;
