import styled from "styled-components";
import Header from "../components/header/Header";
import Calender from "../components/calender/Calendar";
import ReservationList from "../components/reservation/ReservationList";
import {
  useReservationInfoState,
  useReservationInfoDispatch,
} from "../context/ReservationInfoContext";
import {
  useStoreInfoState,
  useStoreInfoDispatch,
} from "../context/StoreInfoContext";

//styled-component
const TotalContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #ffffff;
  border-radius: 20px;
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
  margin: 30px;
  margin-left: 100px;
`;

const ReservationContainer = styled.div`
  margin: 30px;
`;
const ReservationListContainer = styled.div`
  margin-top: 20px;
  width: 30vw;
  background: #ffffff;
  box-shadow: 0px 30px 84px rgba(19, 10, 46, 0.08),
    0px 8px 32px rgba(19, 10, 46, 0.07), 0px 3px 14px rgba(19, 10, 46, 0.03),
    0px 1px 3px rgba(19, 10, 46, 0.13);
  border-radius: 8px;
`;

const LabelText = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
`;
const StoreName = styled.p`
  font-size: 2em;
  font-weight: bold;
`;

function ReservationListPage() {
  const reservationState = useReservationInfoState();
  const reservationDispatch = useReservationInfoDispatch();
  const storeState = useStoreInfoState();
  const storeNameIndex = storeState.selectedId;
  let storeName;
  storeState.totalStore.map((i) => {
    if ((i.id = storeNameIndex)) storeName = i.storeName;
  });

  const SelectDate = (date) => {
    reservationDispatch({
      type: "SELECT_DATE",
      date: date,
    });
  };

  return (
    <TotalContainer>
      <Header />
      <LeftContainer>
        <CalendarContainer>
          <StoreName>{storeName}</StoreName>
          <LabelText>Select a date : </LabelText>
          <Calender SelectDate={SelectDate} />
        </CalendarContainer>
      </LeftContainer>
      <RightContainer>
        <ReservationContainer>
          <LabelText>List of Reservations : </LabelText>
          <ReservationListContainer>
            <ReservationList
              mode="owner"
              reservations={
                reservationState.reservationList.find(
                  (reservation) =>
                    reservation.storeId === reservationState.selectedId &&
                    JSON.stringify(reservation.date) ===
                      JSON.stringify(reservationState.selectedDate)
                ).reservedList
              }
            />
          </ReservationListContainer>
        </ReservationContainer>
      </RightContainer>
    </TotalContainer>
  );
}

export default ReservationListPage;
