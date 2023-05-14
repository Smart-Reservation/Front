import styled from "styled-components";
import { useReservationInfoState } from "../../context/ReservationInfoContext";
import { useStoreInfoState } from "../../context/StoreInfoContext";

//styled-components

const Container = styled.div`
  width: 100%;

`;
const ContentBox = styled.div`
  height: 6vh;

  display: flex;
  padding: 4px 16px;

  font-family: 'Pretendard-Regular';
  font-style: normal;
  font-weight: 500;
  font-size: 1.2em;
  line-height: 22px;

  align-items: center;
  justify-content: center;

  ${(props)=>( props.reservedTimes?.find((time)=>time===props.period)
    ?`color: rgba(195, 195, 200, 0.5);`
    :`color: black;
    ${(props.clicked
      ? ""
      : `&:hover {
          background-color: rgba(255, 230, 199, 0.4); 
          cursor: pointer;
        }`)}
  `)};
  
  background: ${(props) => (props.clicked ? "#FFE6C7" : "white")};
`;

function Period({ period, onClick, clicked }) {
  const storeState=useStoreInfoState();
  const reservationState=useReservationInfoState();
  const reservedTimes=reservationState.reservationList.find((reservation)=>
    reservation.storeId===reservationState.selectedId &&
    JSON.stringify(reservation.date)===JSON.stringify(reservationState.selectedDate)
  )?.reservedList.map((reserved)=>storeState.totalStore.find((store)=>store.id===storeState.selectedId).periodList[reserved.index]);
  
  return (
    <Container onClick={reservedTimes?.find((time)=>time===period)?()=>{}:onClick}>
      <ContentBox  reservedTimes={reservedTimes} period={period} clicked={clicked}>{period}</ContentBox>
    </Container>
  );
}
export default Period;
