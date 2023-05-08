import Period from "./Period";
import {
  useStoreInfoState,
  useStoreInfoDispatch,
} from "../context/StoreInfoContext";
import styled, { css } from "styled-components";
import { useState, useEffect } from "react";

const PeriodListContainer = styled.div`
  width: 30vw;
  height: 200px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 0px;

  margin-top:20px;
  overflow-y: scroll;

  background: #ffffff;
  box-shadow: 0px 30px 84px rgba(19, 10, 46, 0.08),
    0px 8px 32px rgba(19, 10, 46, 0.07), 0px 3px 14px rgba(19, 10, 46, 0.03),
    0px 1px 3px rgba(19, 10, 46, 0.13);
  border-radius: 8px;
`;

function PeriodList({ periods, selectIndex }) {
  const storeState = useStoreInfoState();
  const storeDispatch = useStoreInfoDispatch();
  const [clickeds, setClickeds] = useState(Array(periods.length).fill(false));

  const onClick = (index,realIndex) => {
    const newArr = Array(periods.length).fill(false);
    newArr[index] = true;
    setClickeds(newArr);
    selectIndex(realIndex); 
  };

  return (
    <PeriodListContainer>
      {periods.map((period, index) => (
        <Period
          key={index}
          onClick={()=>{onClick(index,storeState.totalStore.find((store)=>store.id===storeState.selectedId).periodList.indexOf(period))}}
          period={period}
          clicked={clickeds[index]}
        />
      ))}
    </PeriodListContainer>
  );
}

export default PeriodList;
