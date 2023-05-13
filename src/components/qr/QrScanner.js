import { useState } from "react";
import { QrReader } from "react-qr-reader";
import styled, { css } from "styled-components";

const QRContainer = styled.div`
  width: 55%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  display: relative;
  margin: auto;
  mmargin-top: -20%;
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

const QRScan = () => {
  const [selected, setSelected] = useState("environment");
  const [startScan, setStartScan] = useState(true);
  const [loading, setloading] = useState(false);

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
      {loading && <LoadingDiv>Loading</LoadingDiv>}

      {/* <button
        onClick={() => {
          setStartScan(!startScan);
        }}
      >
        {startScan ? "Stop Scan" : "Start Scan"}
      </button> */}
      {startScan && (
        <>
          <QrReader
            facingMode={selected}
            delay={1000}
            onError={handleError}
            videoStyle={{ width: "100%", height: "100%", top: "-10%" }}
            chooseDeviceId={() => selected}
            onResult={(result, error) => {
              if (!!result) {
                console.log(result?.text);
                checkReserve(result);
              }
              // if (!!error) {
              //   console.info(error);
              // }
              /* 에러 표시하는건데 console창 다 가려서 꺼놨음*/
            }}
          />
        </>
      )}
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
