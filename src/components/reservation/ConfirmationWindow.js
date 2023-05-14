import styled from "styled-components";
import { useReservationInfoDispatch, useReservationInfoState } from "../../context/ReservationInfoContext";
import { useUserInfoDispatch, useUserInfoState } from "../../context/UserInfoContext";
import axios from "axios";
import { useStoreInfoState } from "../../context/StoreInfoContext";

const TotalContainer = styled.div`
  width: 20%;
  height: 15%;
  margin: 10px;

  // 정중앙 배치
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  background: #ffffff;
  box-shadow: 0px 0px 8px rgba(194, 198, 204, 0.6);
  border-radius: 6px;

  // font-family: 'Pretendard-Regular';
  font-style: normal;
  font-weight: 600;
  font-size: 1.3em;
  line-height: 1.5em;
  text-align: center;
  z-index: 3;
`;
const ButtonContainer = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  margin-top: 0.5em;
  justify-content: space-evenly;
`;

const Button = styled.div`
  width: 35%;
  border-radius: 20px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(255,200,89,0.7);
  }
`;
const CancelButton = styled(Button)`
  background: #ffa559;
  color: #ffffff;
`;
const ReturnButton = styled(Button)`
  background: rgba(255, 230, 199, 0.5);
  color: #484848;
`;
const Text = styled.div`
  margin-top: 0.5em;
`;

function ConfirmationWindow({mode, onReturn, reservation}){
  const reservationState=useReservationInfoState();
  const reservationDispatch=useReservationInfoDispatch();
  const storeState=useStoreInfoState();
  const userDispatch=useUserInfoDispatch();
  const userState=useUserInfoState();
  const CancelReservation =(reservation)=>{
    let storePeriods = storeState.totalStore.find(
      (store) => store.id === storeState.selectedId
    )?.periodList;
    axios.post(`http://${process.env.REACT_APP_SERVER_HOST}/reservation/cancel`,
    userState.isOwner?
    {
      storeId: reservationState.selectedId,
      address: reservation.address,
      time: reservationState.selectedDate.year+"-"+reservationState.selectedDate.month+"-"+reservationState.selectedDate.day+" "+storePeriods[reservation.index]
    }:
    {
      storeId:reservation.storeId,
      address:userState.address,
      time:reservation.date.year+"-"+reservation.date.month+"-"+reservation.date.day+" "+storePeriods[reservation.index]
    }
    ).then(res=>{
      if(res.status===200){
        reservationDispatch({
          type: "CANCEL_RESERVATION",
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
      }else{
        alert("Failed")
      }
    })
    
    onReturn();
  };

  return (
    <TotalContainer>
      <Text>Do you want to cancel?</Text>
      <ButtonContainer>
        <CancelButton onClick={() => CancelReservation(reservation)}>
          Cancel
        </CancelButton>
        <ReturnButton onClick={() => onReturn()}>Return</ReturnButton>
      </ButtonContainer>
    </TotalContainer>
  );
}

export default ConfirmationWindow;
