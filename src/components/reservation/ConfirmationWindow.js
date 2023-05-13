import styled from "styled-components";
import { useReservationInfoDispatch, useReservationInfoState } from "../../context/ReservationInfoContext";
import { useUserInfoDispatch } from "../../context/UserInfoContext";

const TotalContainer=styled.div`
  width:20vw;
  height:15vh;
  margin:10px;

  // 정중앙 배치
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  background: #FFFFFF;
  box-shadow: 0px 0px 8px rgba(194, 198, 204, 0.6);
  border-radius: 6px;

  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 30px;
  text-align: center;
  z-index:3;   
`;
const ButtonContainer=styled.div`
  width:100%;
  height:40%;
  display:flex; 
  margin-top:0.5em;
  justify-content: space-evenly;
`;

const Button=styled.div`
  width:35%;
  border-radius: 20px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(55, 53, 47, 0.3);
  }
`;
const CancelButton=styled(Button)`
  background: #9A9A9A;
  color: #FFFFFF;
`;
const ReturnButton=styled(Button)`
  background: #E8EAEC;
  color: #484848;
`;
const Text=styled.div`
  margin-top:0.5em;
`;

function ConfirmationWindow({mode, onReturn, reservation}){
  const reservationState=useReservationInfoState();
  const reservationDispatch=useReservationInfoDispatch();
  const userDispatch=useUserInfoDispatch();
  const CancelReservation =(reservation)=>{
    reservationDispatch({
      type: 'CANCEL_RESERVATION',
      index: reservation.index,
    });
    userDispatch({
      type: 'CANCEL_USER_RESERVATION',
      reservation: mode==="user" 
      ? reservation
      :{
        storeId:reservationState.selectedId,
        date:reservationState.selectedDate,
        numbers: reservation.numbers,
        index: reservation.index,
        }
    });
    onReturn();
  }

  return(
    <TotalContainer>
      <Text>Do you want to cancel?</Text>
      <ButtonContainer>
        <CancelButton onClick={()=>CancelReservation(reservation)}>Cancel</CancelButton>
        <ReturnButton onClick={()=>onReturn()}>Return</ReturnButton>
      </ButtonContainer>
    </TotalContainer>
  );

}

export default ConfirmationWindow;