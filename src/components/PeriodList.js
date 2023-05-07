import Period from "./Period";
import { useReservationInfoState, useReservationInfoDispatch } from '../context/ReservationInfoContext';
import styled ,{css}  from "styled-components";

const PeriodListContainer=styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 0px;

  position: absolute;
  width: 459px;
  height: 200px;
  left: 791px;
  top: 172px;
  overflow-y: scroll;

  /* White */

  background: #FFFFFF;
  box-shadow: 0px 30px 84px rgba(19, 10, 46, 0.08), 0px 8px 32px rgba(19, 10, 46, 0.07), 0px 3px 14px rgba(19, 10, 46, 0.03), 0px 1px 3px rgba(19, 10, 46, 0.13);
  border-radius: 8px;
`;

function PeriodList({periods}){
  const state = useReservationInfoState();
  const dispatch = useReservationInfoDispatch(); 
  
  return(
    <PeriodListContainer>
      {periods.map((period)=>(
        <Period period={period}
        />
      ))}
    </PeriodListContainer>
  )

}

export default PeriodList;

