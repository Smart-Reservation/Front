import styled from "styled-components";
import {
  useStoreInfoState,
  useStoreInfoDispatch,
} from "../context/StoreInfoContext";
import Header from "../components/header/Header";
import Calender from "../components/calender/Calendar";
import PeriodList from "../components/PeriodList";
import ReservationList from "../components/ReservationList";
import {
  useReservationInfoDispatch,
  useReservationInfoState,
} from "../context/ReservationInfoContext";
//styled-component
const TotalContainer = styled.div``;
const LeftContainer = styled.div``;
const RightContainer = styled.div``;

function SettingPage() {
  const reservationState = useReservationInfoState();
  const reservationDispatch = useReservationInfoDispatch();
  const state = useStoreInfoState();
  const dispatch = useStoreInfoDispatch();

  return (
    <TotalContainer>
      <Header />
      <LeftContainer>
        <Calender />
      </LeftContainer>
      <RightContainer>
        <PeriodList 
          periods={state.totalStore.find(store => store.id === state.selectedId).periodList} 
          //periods={[{startTime:"10:00",endTime:"11:00"}]}
        />
        {/* <ReservationList
          reservations={
            reservationState.reservationList.find(
              (reservation) =>
                (reservation.storeId === reservationState.selectedId) &&
                (reservation.date === reservationState.date)
            ).possibleList
          }
        /> */}
      </RightContainer>
    </TotalContainer>
  );
}

export default SettingPage;
