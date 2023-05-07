import React, { useReducer, createContext, useContext } from "react";

const initialState={
  address:"",
  coin:0.00, //그럼 가게도 있어야 하는거 아니야..?
  reservationList:[
    {
      storeId:1,
      date:{
        year:2023,
        month:5,
        day:5
      },
      reservationIdx:0,  
    },
  ]
};

function UserInfoReducer(state,action){
  switch(action.type){
    case "LOAD_USER_RESERVSTIONS": //사용자 예약 목록 불러오기
      return{
        ...state,
        address:action.address,
        coin:action.coin, //
        reservationList:action.reservationList,
      }
      case "ADD_USER_RESERVATION": //사용자 예약 추가
      return{
        ...state,
        reservationList:state.reservationList.concat(action.reservation),
      };
    case "CANCEL_STORE_RESERVATION": //사용자 예약 취소
      return{
        ...state,
        reservationList:state.reservationList.filter(
          (reservation) => reservation !== action.reservation),
      };
    default:
      return state;
  }
}

const UserInfoDispatchContext = createContext();
const UserInfoStateContext = createContext();

export function UserInfoProvider({ children }) {
  const [state, dispatch] = useReducer(UserInfoReducer, initialState);

  return (
    <div>
      <UserInfoStateContext.Provider value={state}>
        <UserInfoDispatchContext.Provider value={dispatch} >
          {children}
        </UserInfoDispatchContext.Provider>
      </UserInfoStateContext.Provider>
    </div>
  );
}

export function useUserInfoState() {
  return useContext(UserInfoStateContext);
}

export function useUserInfoDispatch() {
  return useContext(UserInfoDispatchContext);
}