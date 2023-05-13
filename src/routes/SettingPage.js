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

  & > .StoreName {
    font-weight: bold;
    font-size: 1.5em;
    margin: 2em 0em 0em 4em;
    padding: 0;
  }
`;

const LeftContainer = styled.div`
  float: left;
  width: 40%;
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
  margin: 2em 3em 3em 6em;
`;

const PeriodContainer = styled.div`
  margin: 3em;
  margin-top: 2em;
`;
const NumberContainer = styled.div`
  margin: 3em;
  margin-top: 0px;
`;

const NumberBtn = styled.div`
  width: 100%;
  display: flex;
  margin-top: 2em;
  margin-left: 14%;
`;

const DecreaseBtn = styled.div`
  width: 3em;
  height: 3em;

  background: #fefce5;
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
    background-color: #ff6000;
  }
`;

const IncreaseBtn = styled.div`
  width: 3em;
  height: 3em;

  background: #fefce5;
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
    background-color: #ff6000;
  }
`;

const NumberText = styled.div`
  width: 12em;
  height: 3em;

  line-height: 2em;
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

const SettingBtn = styled.div`
  width: 13em;
  height: 2em;
  margin: 3em;
  margin-top: 1em;
  margin-left: 17%;

  background: #ff6000;
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
    background-color: #ffe6c7;
  }
`;
const ImgForBtn = styled.img`
  width: 2em;
  padding-top: 6px;
`;
function SettingPage() {
  const reservationDispatch = useReservationInfoDispatch();
  const storeState = useStoreInfoState();
  const storeDispatch = useStoreInfoDispatch();
  const [deposit, setDeposit] = useState(storeState.totalStore.find((store)=>store.id===storeState.selectedId).deposit);
  const [Indexs, setIndexs] = useState([]);
  const nav = useNavigate();


  const SelectDate = (date) => {
    reservationDispatch({
      type: "SELECT_DATE",
      date: date,
    });
  };
  const SelectIndexs = (Index) => {
    setIndexs([...Indexs, Index]);
  };
  const SelectDeposit = (deposit) => {
    storeDispatch({
      type: "SELECT_STORE_DEPOSIT",
      deposit: deposit,
    });
  };
  const AddSetting = (idxs) => {
    SelectDeposit(deposit);
    reservationDispatch({
      type: "ADD_SETTING",
      impossibleIdxList: idxs,
    });
    nav("/ReservationListPage");
  };

  return (
    <TotalContainer>
      <Header />
      <div className="StoreName">{storeState.totalStore.find(store=>store.id===storeState.selectedId).storeName}</div>


      <LeftContainer>
        <CalendarContainer>
          <LabelText>
            <> </> Select a date :
          </LabelText>

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
        <SettingBtn
          onClick={() => {
            AddSetting(Indexs);
          }}
        >
          SETTING
        </SettingBtn>
      </RightContainer>
    </TotalContainer>
  );
}

export default SettingPage;
