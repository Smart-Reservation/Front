import { useState } from "react";
import { QrReader } from "react-qr-reader";
import styled, { css } from "styled-components";
import ReservationDetail from "../reservationDetail/ReservationDetail";
import { useStoreInfoState } from "../../context/StoreInfoContext";
import axios from "axios";
import { useReservationInfoDispatch, useReservationInfoState } from "../../context/ReservationInfoContext";

const QRContainer = styled.div`
  width: 55%;
  height:100vh;
  display: flex;
  flex-direction: column;
  display: relative;
  margin: auto;
  margin-top: 5%;
`;
const LoadingDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  z-index: 500;
  top: 10%;
`;



const QRScan = () => {
  const [data, setData] = useState();
  const [startScan, setStartScan] = useState(true);
  const reservationDispatch = useReservationInfoDispatch();
  const reservationState=useReservationInfoState();
  const storeState = useStoreInfoState()

  const storeIdRequest = (data) => {
    if(data.storeId===reservationState.selectedId){
    reservationDispatch({type:"SELECT_DATE",date:data.date})
    reservationDispatch({type:"SELECT_CURRENT",set:data.set})
    axios.post(`http://${process.env.REACT_APP_SERVER_HOST}/reservation/showUp`,{
      address:data.address,
      storeId:data.storeId,
      time:data.date.year+"-"+data.date.month+"-"+data.date.day+" "
      +storeState.totalStore.find((store)=>store.id===data.storeId).periodList[data.set.index]
    }).then((res) => {
      if(res.status===200){
        setData(data)
      axios.get(`http://${process.env.REACT_APP_SERVER_HOST}/reservation/list/${data.storeId}`).then((res) => {
          reservationDispatch({
            type: "LOAD_STORE_RESERVATION",
            reservationList: res.data,
            id: data.storeId
          })
          setTimeout(() => {
            setData();
            setStartScan(true);
          }, 5000);
        })
      }else{
        alert("Not Exist")
        setData();
        setStartScan(true);
      }
      })
    }else{
      alert("Other QR Store ")
      setData();
      setStartScan(true);
    }
  }

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <QRContainer>
      {startScan ? (
        <>
          <QrReader
            facingMode={"environment"}
            delay={5000}
            onError={handleError}
            videoStyle={{ width: "100%", height: "100%", top: "-10%" }}
            // chooseDeviceId={() => selected}
            onResult={(result, error) => {
              if (!!result) {
                setStartScan(false);
                storeIdRequest(JSON.parse(result?.text))
              }
              if (!!error) {
                console.info(error);
              }
            }}
          />
        </>
      ) : data && <LoadingDiv><ReservationDetail store={storeState.totalStore.find((store)=>store.id===data.storeId)} /></LoadingDiv>}
    </QRContainer>
  );
}

function QRScanner() {
  return (
    <div>
      <QRScan />
    </div>
  );
}

export default QRScanner;
