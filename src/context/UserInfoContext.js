import React, { useReducer, createContext, useContext } from "react";
import login from "../components/Login";

const now=new Date();
const initialState={
  login:false,
  address:"0xE2C20E354D8841EccA194B68506DA81827726e30",
  coin:0.00,
  isOwner:false,
  reservationList:[
    {
      storeId:1,
      date:{
        year:now.getFullYear(),
        month:now.getMonth()+1,
        day:now.getDate()
      },
      numbers: 2,
      index: 0,
    },
    {
      storeId:1,
      date:{
        year:now.getFullYear(),
        month:now.getMonth()+1,
        day:now.getDate()
      },
      numbers: 1,
      index: 3,
    },
  ],
};

function UserInfoReducer(state, action) {
  switch (action.type) {
    case "LOAD_USER_RESERVSTIONS": //사용자 예약 목록 불러오기
      return {
        ...state,
        address: action.address,
        coin: action.coin, //
        reservationList: action.reservationList,
      };
    case "ADD_USER_RESERVATION": //사용자 예약 추가
      return {
        ...state,
        reservationList: state.reservationList.concat(action.reservation),
      };
    case "CANCEL_USER_RESERVATION": //사용자 예약 취소
      return {
        ...state,
        reservationList: state.reservationList.filter(
          (reservation) => JSON.stringify(reservation) !== JSON.stringify(action.reservation)
        ),
      };
    case "SWITCH_USER":
      return {
        ...state,
        isOwner: false
      }
    case "SWITCH_OWNER":
      return {
        ...state,
        isOwner : true
      }
    case "LOGIN":
      return{
        ...state,
        login:true,
        address: action.address,
        coin:action.coin,
        isOwner:false
      }
    case "LOGOUT":
      return initialState;
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
        <UserInfoDispatchContext.Provider value={dispatch}>
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
