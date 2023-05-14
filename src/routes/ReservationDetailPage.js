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
  height: 100%;
  width: 100%;
`;

const TotalContainer = styled.div`
  display: flex;
  // position: relative;  
  margin: 3% 10%;
  width: 80%;
  height: 80%;
  background-color: rgba(255, 230, 198, 0.5);
  border-radius: 20px;
`;
const LeftContainer = styled.div`
  width: 45%;
  padding: auto;
  height: 100%;
`;

const RightContainer = styled.div`
  width: 55%;
  height: 100%;
`;

function ReservationDetailPage() {
  const storeState = useStoreInfoState();
  const storeDispatch = useStoreInfoDispatch();

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
            <QrImage/>
          </RightContainer>
        </TotalContainer>
      </OuterConTainer>
    </>
  );
}

export default ReservationDetailPage;
