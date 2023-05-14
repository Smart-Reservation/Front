import { useState } from "react";
import { QrReader } from "react-qr-reader";
import styled, { css } from "styled-components";
import ReservationDetail from "../reservationDetail/ReservationDetail";
import { useStoreInfoState } from "../../context/StoreInfoContext";

const QRContainer = styled.div`
  width: 55%;
  height:100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  display: relative;
  margin: auto;
  // margin-top: -20%;
  // background: red;
`;
const LoadingDiv = styled.div`
  display: flex;
  height: 30vh;
  margin: auto;
  padding: 0;
  width: 40vw;
  position: absolute;
  justify-content: center;
  align-items: center;
  background: white;
  z-index: 500;
  left: 30%;
  top: 40%;
  border: 1px solid black;
`;

const BlackBox = styled.div`
  width: 100%;
  height: 100%;
  top:10%;
  background-color: black;
`;

const QRScan = () => {
  const [selected, setSelected] = useState("environment");
  const [data,setData]=useState();
  const [startScan, setStartScan] = useState(true);
  const [storeId,setStoreId]=useState();
  const [loading, setloading] = useState(false);

  const storeState=useStoreInfoState()
  function sendQRAddress(e) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 5000);
    });
    //   return new Promise((resolve, reject) => {
    //     fetch({ url }, { method: "POST" });
    //   });
  }
  // const storeIdRequest=(data)=>{
  //   axios.pose(`http://${process.env.REACT_APP_SERVER_HOST}/reservation/exist/`,data).then((res) => {
  //     setStoreId(res.data);
  // })
  // }
  const checkReserve = async (e) => {
    setloading(true);
    // await sendQRAddress()
    //   .then((res) => res.json())
    //   .then((res) => console.log(res))
    //   .catch(console.log("try again"));
    await sendQRAddress();
    setloading(false);

    console.log(e);
    /* e.text에 url 정보가 담겨 있음. 위의 식은 서버와 url정보를 주고 받고 하는 코든데
    어떻게 줘야 할지 몰라서 뺴놨음 ㅈㅅ ㅠㅠ*/
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <QRContainer>
      {/* <button
        onClick={() => {
          setStartScan(!startScan);
        }}
      >
        {startScan ? "Stop Scan" : "Start Scan"}
      </button> */}
      {startScan ? (
        <>
          <QrReader
            facingMode={selected}
            delay={5000}
            onError={handleError}
            videoStyle={{ width: "100%", height:"100%",top: "-10%"  }}
            chooseDeviceId={() => selected}
            onResult={(result, error) => {
              if (!!result) {
                setStartScan(false);
                console.log(result?.text);
                // storeIdRequest(JSON.parse(result?.text))
                
              }
              if (!!error) {
                console.info(error);
              }
              /* 에러 표시하는건데 console창 다 가려서 꺼놨음*/
            }}
          />
          </>
      ):data&&""}
      {/* <LoadingDiv><ReservationDetail store={} /></LoadingDiv>} */}
    </QRContainer>
  );
};

function QRScanner() {
  return (
    <div>
      <QRScan />
    </div>
  );
}

export default QRScanner;
