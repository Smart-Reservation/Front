import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ConfirmationWindow from "../reservation/ConfirmationWindow";

const OwnerOptionContainer = styled.div`
  width: 12vw;
  margin: 10px;

  position: absolute;
  top: 3.5em;
  right: 7em;

  background: #ffffff;
  box-shadow: 0px 0px 8px rgba(194, 198, 204, 0.6);
  border-radius: 6px;

  font-family: 'Pretendard-Regular' ;
  font-style: normal;
  font-weight: 600;
  font-size: 1.2em;
  line-height: 2em;

  text-align: center;
  z-index: 1;
`;

const BtnContainer = styled.div`
  height: 5vh;
  color: black;
  &:hover {
    background-color: rgba(255, 230, 199, 0.4); 
  }
  &:active {
    background-color: #ffa559;
  }
`;

function OwnerOption({ isOwner }) {
  const nav = useNavigate();
  return (
    <>
      <OwnerOptionContainer>
        <BtnContainer onClick={() => nav("/SettingPage")}>Setting</BtnContainer>
        <BtnContainer onClick={() => nav("/ReservationListPage")}>
          Reservation List
        </BtnContainer>
        <BtnContainer onClick={() => nav("/QRScanPage")}>
          QR reader
        </BtnContainer>
      </OwnerOptionContainer>
    </>
  );
}

export default OwnerOption;
