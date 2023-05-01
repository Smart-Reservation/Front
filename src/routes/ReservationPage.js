import PeriodList from "../components/PeriodList";
import Calender from "../components/Calender";
import { useReservationInfoState, useReservationInfoDispatch } from '../context/ReservationInfoContext';
import styled, { css } from "styled-components";

const TotalContainer=styled.div`
`;

const LeftContainer=styled.div`
`;

const RightContainer=styled.div`
`;

function ReservationPage(){
  const state = useReservationInfoState();
  const dispatch = useReservationInfoDispatch(); 

  return(
    <TotalContainer>
      {/* <LeftContainer>
        <Calender />
      </LeftContainer> */}
      <RightContainer>
        <PeriodList 
          periods={state.totalStore.find(store => store.id === state.selectedId).periodList} 
          //periods={[{startTime:"10:00",endTime:"11:00"}]}
        />
      </RightContainer>
    </TotalContainer>
  )
}

export default ReservationPage;