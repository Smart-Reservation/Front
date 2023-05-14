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
  margin-left: 6em;
  margin-top: 2em;
`;

const ReservationContainer = styled.div`
  margin: 3em;
  margin-top: 2em;
`;
const ReservationListContainer = styled.div`
  margin-top: 1em;
  width: 30vw;
  background: #ffffff;
  box-shadow: 0px 30px 84px rgba(19, 10, 46, 0.08),
    0px 8px 32px rgba(19, 10, 46, 0.07), 0px 3px 14px rgba(19, 10, 46, 0.03),
    0px 1px 3px rgba(19, 10, 46, 0.13);
  border-radius: 8px;
`;

const LabelText = styled.div`
  font-family: 'Pretendard-Regular';
  font-style: normal;
  font-weight: 500;
  font-size: 1em;
  line-height: 24px;
`;

function ReservationListPage() {
  const reservationState = useReservationInfoState();
  const reservationDispatch = useReservationInfoDispatch();
  const storeState = useStoreInfoState();

  const SelectDate = (date) => {
    reservationDispatch({
      type: "SELECT_DATE",
      date: date,
    });
  };

  return (
    <TotalContainer>
      <Header />
      <div className="StoreName" style={{fontFamily:'Pretendard-Regular'}}>{storeState.totalStore.find(store=>store.id===storeState.selectedId).storeName}</div>
      <LeftContainer>
        <CalendarContainer>
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
                )?.reservedList
              }
            />
          </ReservationListContainer>
        </ReservationContainer>
      </RightContainer>
    </TotalContainer>
  );
}

export default ReservationListPage;
