import React, { useReducer, createContext, useContext } from "react";

const initialState={
  totalStore: [
    {
      id:1,
      category:"food",
      storeName: "store1",
      location:"location",
      deposit:"0.025",
      imgUrl:"store/img/1",  
      periodList:["10:00","11:00","12:00","13:00","14:00"], //0,1,2,3,4
    },
  ],
  selectedId:1, //선택된 가게 ID
};

function StoreReducer(state, action){
  switch(action.type){
    case "LOAD_STORE_LIST": //가게 리스트 불러오기
      return {
        ...state,
        totalStore:action.totalStore
      };
    default:
      return state;
  }
}

const StoreInfoStateContext = createContext();
const StoreInfoDispatchContext = createContext();

export function StoreInfoProvider({children}){
  const [state, dispatch] = useReducer(StoreReducer, initialState);
  return (
    <StoreInfoStateContext.Provider value={state}>
      <StoreInfoDispatchContext.Provider value={dispatch}>
        {children}
      </StoreInfoDispatchContext.Provider>
    </StoreInfoStateContext.Provider>
  );
}

export function useStoreInfoState() {
  return useContext(StoreInfoStateContext);
}

export function useStoreInfoDispatch() {
  return useContext(StoreInfoDispatchContext);
}