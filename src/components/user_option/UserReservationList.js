import ReservationList from "../reservation/ReservationList";
import { useUserInfoState } from "../../context/UserInfoContext";
import styled from "styled-components";
import X from "../../asset/img/X.png";

const ReservationContainer=styled.div`
  width: 35vw;
  height: 300px;
  margin:30px;

  position:absolute;
  top:3em;
  right:7em;

  background: #FFFFFF;
  box-shadow: 0px 0px 8px rgba(194, 198, 204, 0.6);
  border-radius: 10px;
  display:flex;
  flex-direction: column;
  align-items: center;
  z-index:2;
`;
const TitleContainer=styled.div`
  width:100%;
  display:flex; 
  justify-content: space-between;
`;

const LabelText=styled.div`
  margin:20px;
  margin-left:20px;
  
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 40px;
`;

const ImageContainer=styled.div`
  margin:20px;
  display:flex;
  align-items: center;
`;

  function UserReservationList({Close,onClick}){
  const userState=useUserInfoState();

  return (
    <ReservationContainer>
      <TitleContainer>
        <LabelText>Reservation List</LabelText>
        <ImageContainer onClick={Close}>
          <img src={X} width={"15px"} height={"15px"}/>
        </ImageContainer>
      </TitleContainer>
      <ReservationList mode="user" reservations={userState.reservationList}/>
    </ReservationContainer>
  );
}

export default UserReservationList;