import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ConfirmationWindow from "../reservation/ConfirmationWindow";

const OwnerOptionContainer = styled.div`
  width: 12vw;
  margin: 10px;

  position: absolute;
  top: 3.5em;
  right: 14em;

  background: #ffffff;
  box-shadow: 0px 0px 8px rgba(194, 198, 204, 0.6);
  border-radius: 6px;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 30px;
  text-align: center;
  z-index: 1;
`;

const BtnContainer = styled.div`
  height: 5vh;
  color: #484848;
  &:hover {
    background-color: rgba(84, 69, 93, 0.2);
  }
  &:active {
    background-color: rgba(84, 69, 93, 0.5);
  }
`;

function OwnerOption({ isOwner }) {
  const nav = useNavigate();
  return (
    <>
      {isOwner ? (
        <OwnerOptionContainer>
          <BtnContainer onClick={() => nav("/SettingPage")}>
            Setting
          </BtnContainer>
          <BtnContainer onClick={() => nav("/ReservationListPage")}>
            Reservation List
          </BtnContainer>
          <BtnContainer onClick={() => nav("/QRScanPage")}>
            QR reader
          </BtnContainer>
        </OwnerOptionContainer>
      ) : (
        <OwnerOptionContainer>
          <BtnContainer onClick={() => nav("/ReservationListPage")}>
            Reservation List
          </BtnContainer>
        </OwnerOptionContainer>
      )}
    </>
  );
}

export default OwnerOption;
