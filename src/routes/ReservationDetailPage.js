import Header from "../components/header/Header";
import styled, { css } from "styled-components";
import QRCode from "../components/qr/generateQR/QrImage";
import ReservationDetail from "../components/reservationDetail/ReservationDetail";
import QrImage from "../components/qr/generateQR/QrImage";
import {
  useStoreInfoState,
  useStoreInfoDispatch,
} from "../context/StoreInfoContext";
const OuterConTainer = styled.div`
  height: 100vh;
  width: 100vw;
`;
const TotalContainer = styled.div`
  display: flex;
  position: relative;
  margin: 3% 10%;
  width: 80%;
  height: 80vh;
  background: beige;
  border-radius: 20px;
`;
const LeftContainer = styled.div`
  width: 50%;
  padding: auto;
  height: 100%;
`;

const RightContainer = styled.div`
  width: 50%;
  height: 100%;
`;

function ReservationDetailPage() {
  const storeState = useStoreInfoState();
  const storeDispatch = useStoreInfoDispatch();
  const value =
    "asdfa8aw8e013897fgv7asd8c87d128dbw08c8gsd0fgg123xe218exy231789xe21896ec9b868ce69cr6rgre";
  //value에 값 전달하기

  return (
    <>
      <OuterConTainer>
        <Header />

        <TotalContainer>
          <LeftContainer>
            <ReservationDetail
              store={storeState.totalStore.find(
                (store) => store.id === storeState.selectedId
              )}
            />
          </LeftContainer>
          <RightContainer>
            <QrImage valueForQr={value} />
          </RightContainer>
        </TotalContainer>
      </OuterConTainer>
    </>
  );
}

export default ReservationDetailPage;
