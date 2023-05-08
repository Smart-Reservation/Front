import styled from "styled-components";
import { useStoreInfoState } from "../../context/StoreInfoContext";
import { useState } from "react";
import X from "./X.png";

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
  font-size: 18px;
  line-height: 22px;

  align-items: center;
  justify-content: space-between;

  background: ${(props) => (props.clicked ? "#E0E2E6" : "white")};

  ${(props) =>
    props.clicked
      ? ""
      : `&:hover {
    background-color: rgba(55, 53, 47, 0.05);
  }`}
`;

function Reservation({ reservation, onClick, index, clicked }) {
  const storeState = useStoreInfoState();
  let storeName = storeState.totalStore.find(
    (store) => store.id === reservation.storeId
  ).storeName;
  let timeStamp =
    reservation.date.year +
    "/" +
    reservation.date.month +
    "/" +
    reservation.date.day;
  const [hovered, setHovered] = useState(false);
  const Hovered = () => {
    setHovered(true);
  };
  const NotHovered = () => {
    setHovered(false);
  };

  return (
    <Container
      onClick={() => onClick(index)}
      onMouseEnter={() => Hovered()}
      onMouseLeave={() => NotHovered()}
    >
      <ContentBox clicked={clicked} hovered={hovered}>
        {storeName} {timeStamp} {reservation.numbers}people
        {hovered ? <img src={X} width={"15px"} height={"15px"} /> : <></>}
      </ContentBox>
    </Container>
  );
}

export default Reservation;
