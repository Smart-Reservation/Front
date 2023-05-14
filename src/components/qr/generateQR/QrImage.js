import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import styled from "styled-components";
import { useUserInfoState } from "../../../context/UserInfoContext";
import { useStoreInfoState } from "../../../context/StoreInfoContext";
import { useReservationInfoState } from "../../../context/ReservationInfoContext";

const QRContainer = styled.div`
  display: flex;
  border: 10px sold black;
  padding: 5% 10%;
`;

// const Hider = styled.div`
//   display: "block";
//   background: "black";

//   margin: "5%";
//   width: "100%";
//   height: "100%";
//   padding: "5% 10%";
//   borderradius: "10px";
//   border: 1px solid black;
// `;

// const BtnHider = styled.div`
//   position: absolute;
//   border: 2px white solid;
//   color: white;
//   background-color: transparent;
//   font-size: 2em;

//   & :hover {
//     cursor: grab;
//   }
// `;

function QrImage() {
  const userState=useUserInfoState();
  const storeState=useStoreInfoState();
  const reservationState=useReservationInfoState()

  return (
      <QRContainer>
        <QRCode
            value={
              JSON.parse({
              address:userState.address,
              storeId:storeState.selectedId,
              time : reservationState.selectedDate.year+"-"+reservationState.selectedDate.month+"-"+reservationState.selectedDate.day+" "
              +storeState.totalStore.find((store)=>store.id===reservationState.selectedId).periodList[reservationState.currentSet.index]
            })}
            style={{
              background: "white",
              margin: "5%",
              width: "100%",
              padding: "0% 10%",
              borderRadius: "10px",
            }}
            size={500}
            // viewBox={`0 0 400 400`}
          />

        {/* <HideQr /> */}
      </QRContainer>
  );
}

export default QrImage;
