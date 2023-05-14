import styled from "styled-components";
import { useStoreInfoDispatch, useStoreInfoState } from "../../context/StoreInfoContext";
import { useState } from "react";
import X from "../../asset/img/X.png";
import ConfirmationWindow from "./ConfirmationWindow";
import { useReservationInfoDispatch, useReservationInfoState } from "../../context/ReservationInfoContext";
import { useNavigate } from "react-router-dom";
import { useUserInfoState } from "../../context/UserInfoContext";

//styled component
//styled-components

const Container = styled.div`
  width: 100%;
`;
const ContentBox = styled.div`
  height: 32px;

  display: flex;
  padding: 4px 16px;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 1em;
  line-height: 22px;

  align-items: center;
  justify-content: space-between;

  background: ${(props) => (props.mode==="user" && props.clicked ? "#E0E2E6" : "white")};

  ${(props) =>
    props.clicked
      ? ""
      : `&:hover {
    background-color: rgba(55, 53, 47, 0.05);
  }`}

  ${(props)=>props.mode==="user"&&'cursor:pointer;'}
`;
const FullContainer=styled.div`
  width:100vw;
  height:100vh;

  position:fixed;
  left: 0%;
  top: 0%;

  backdrop-filter: blur(8px);
`;

function Reservation({ mode, reservation, onClick, index, clicked }) {
  const storeState = useStoreInfoState();
  const reservationState=useReservationInfoState();
  const reservationDispatch=useReservationInfoDispatch();
  const storeDispatch=useStoreInfoDispatch();
  const userState=useUserInfoState()
  const nav=useNavigate();
  let store=(mode==="user")
    ?storeState.totalStore.find((store) => store.id === reservation.storeId)
    :storeState.totalStore.find((store)=>store.id===storeState.selectedId)
  ;
  let storeName = store.storeName;
  let date=(mode==="user")?reservation.date:reservationState.selectedDate;
  let timeIdx=reservation.index;
  let timeStamp = date.year + "/" + date.month + "/" + date.day+ " "+ store.periodList[timeIdx];
  const [hovered, setHovered] = useState(false);
  const Hovered = () => {
    setHovered(true);
  };
  const NotHovered = () => {
    setHovered(false);
  };

  const [close,setClose]=useState(false);
  const onClose=()=>{
    setClose(true);
  }
  const NotClose=()=>{
    setClose(false);
  }

  return (
    <>
    <Container
      onClick={() => onClick(index)}
      onMouseEnter={() => Hovered()}
      onMouseLeave={() => NotHovered()}
    >
      <ContentBox clicked={clicked} hovered={hovered} mode={mode} onClick={mode==="user"? ()=>{
      storeDispatch({type:"SELECT_STORE",id:reservation.storeId})
      reservationDispatch({type:"SELECT_CURRENT",set:{
        address:userState.address,
        numbers:reservation.numbers,
        index:reservation.index
      }})
      reservationDispatch({type:"SELECT_DATE",date:reservation.date})
      nav("/ReservationDetailPage")
      }:()=>{}}>
        {
          mode==="user"
          ?<>{storeName} {timeStamp} {reservation.numbers}people</>
          :<>{reservation.address} {timeStamp} {reservation.numbers}people</>
        }
        {hovered ? <img src={X} alt="close" onClick={()=>onClose()} width={"15px"} height={"15px"}/>: <></>}
      </ContentBox>
    </Container>
    {close&&<FullContainer><ConfirmationWindow mode={mode} reservation={reservation} onReturn={NotClose}/></FullContainer>}
    </>
  );
}

export default Reservation;
