import styled from "styled-components";
import {
  useStoreInfoState,
  useStoreInfoDispatch,
} from "../context/StoreInfoContext";
import Header from "../components/header/Header";
import Calender from "../components/calender/Calendar";
import PeriodList from "../components/period/PeriodList";
import ReservationList from "../components/reservation/ReservationList";
import {
  useReservationInfoDispatch,
  useReservationInfoState,
} from "../context/ReservationInfoContext";
import { useNavigate } from "react-router";
import { useState } from "react";

//styled-component
const TotalContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #ffffff;
  border-radius: 20px;
`;

const LeftContainer = styled.div`
  float: left;
  width: 50%;
  height: 100%;
`;
const RightContainer = styled.div`
  float: right;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const CalendarContainer = styled.div`
  margin: 30px;
  margin-left: 100px;
`;

const PeriodContainer = styled.div`
  margin: 30px;
`;
const NumberContainer = styled.div`
  margin: 30px;
  margin-top: 0px;
`;

const NumberBtn = styled.div`
  width: 100%;
  display: flex;
  margin-top: 20px;
`;

const DecreaseBtn = styled.div`
  width: 48px;
  height: 48px;

  background: #e0e2e6;
  box-shadow: 0px 30px 84px rgba(0, 0, 0, 0.08),
    0px 8px 32px rgba(0, 0, 0, 0.07), 0px 3px 11px rgba(0, 0, 0, 0.03),
    0px 1px 3px rgba(0, 0, 0, 0.13);
  border-radius: 10px 0px 0px 10px;
  line-height: 40px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: rgba(190, 190, 191, 0.9);
  }
`;

const IncreaseBtn = styled.div`
  width: 48px;
  height: 48px;

  background: #e0e2e6;
  box-shadow: 0px 30px 84px rgba(0, 0, 0, 0.08),
    0px 8px 32px rgba(0, 0, 0, 0.07), 0px 3px 11px rgba(0, 0, 0, 0.03),
    0px 1px 3px rgba(0, 0, 0, 0.13);
  border-radius: 0px 10px 10px 0px;
  line-height: 40px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: rgba(190, 190, 191, 0.9);
  }
`;

const NumberText = styled.div`
  width: 224px;
  height: 48px;

  line-height: 40px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  background: #ffffff;
`;

const LabelText = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
`;

const ReservationBtn = styled.div`
  width: 328px;
  height: 46px;
  margin: 30px;
  margin-top: 0px;

  background: #484848;
  border-radius: 23px;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 40px;

  text-align: center;
  color: #ffffff;

  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: rgba(195, 195, 200, 1);
  }
`;
const StoreName = styled.p`
  font-size: 2em;
  font-weight: bold;
`;

function SettingPage() {
  const reservationState = useReservationInfoState();
  const reservationDispatch = useReservationInfoDispatch();
  const storeState = useStoreInfoState();
  const storeDispatch = useStoreInfoDispatch();
  const [deposit, setDeposit] = useState(0.0);
  const [Indexs, setIndexs] = useState([]);
  const nav = useNavigate();
  const storeNameIndex = storeState.selectedId;
  let storeName;
  storeState.totalStore.map((i) => {
    if (i.id === storeNameIndex) storeName = i.storeName;
  });

  const SelectDate = (date) => {
    reservationDispatch({
      type: "SELECT_DATE",
      date: date,
    });
  };
  const SelectIndexs = (Index) => {
    setIndexs([...Indexs, Index]);
  };
  const AddSetting = (idxs) => {
    storeDispatch({
      type: "SELECT_STORE_DEPOSIT",
      deposit: deposit,
    });
    reservationDispatch({
      type: "ADD_SETTING",
      possibleIdxList: idxs,
    });
    nav("/ReservationListPage");
  };

  return (
    <TotalContainer>
      <Header />
      <LeftContainer>
        <CalendarContainer>
          <StoreName>{storeName}</StoreName>

          <LabelText>Select a date : </LabelText>
          <Calender SelectDate={SelectDate} />
        </CalendarContainer>
      </LeftContainer>
      <RightContainer>
        <PeriodContainer>
          <LabelText>Select a period : </LabelText>
          <PeriodList
            mode="owner"
            periods={
              storeState.totalStore.find(
                (store) => store.id === storeState.selectedId
              ).periodList
            }
            selectIndexs={SelectIndexs}
          />
        </PeriodContainer>
        <NumberContainer>
          <LabelText>Price Coin /1 Person</LabelText>
          <NumberBtn>
            <DecreaseBtn
              onClick={
                deposit <= 0.0
                  ? () => {}
                  : () => {
                      setDeposit(deposit - 0.001);
                    }
              }
            >
              -
            </DecreaseBtn>
            <NumberText>{deposit.toFixed(3)}</NumberText>
            <IncreaseBtn
              onClick={() => {
                setDeposit(deposit + 0.001);
              }}
            >
              +
            </IncreaseBtn>
          </NumberBtn>
        </NumberContainer>
        <ReservationBtn
          onClick={() => {
            AddSetting(Indexs);
          }}
        >
          SETTING
        </ReservationBtn>
      </RightContainer>
    </TotalContainer>
  );
}

export default SettingPage;
