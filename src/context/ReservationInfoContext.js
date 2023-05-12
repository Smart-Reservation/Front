import React, { useReducer, createContext, useContext } from "react";

const now=new Date();
const initialState={
  reservationList:[
    {
      storeId:1,
      date:{
        year:now.getFullYear(),
        month:now.getMonth()+1,
        day:now.getDate()
      },
      possibleIdxList:[0,2,3,5,6,7], //1,4 제외한 나머지 0,2,3,5,6,7시간대만 예약가능 
      reservedList:[
        {
          address:"0xE2C20E354D8841EccA194B68506DA81827726e30",
          numbers:2,
          index:0
        },
        {
          address:"0xE2C20E354D8841EccA194B68506DA81827726e30",
          numbers:1,
          index:3
        }
      ]
    },
  ],
  selectedId:1, //선택된 가게 ID
  selectedDate:{ 
    year:now.getFullYear(),
    month:now.getMonth()+1,
    day:now.getDate()
  },
  currentSet:{
    address:"0xE2C20E354D8841EccA194B68506DA81827726e30",
    numbers:2,
    index:0
  }
};

function ReservationReducer(state, action){
  switch(action.type){
    case "LOAD_STORE_RESERVATION": //해당 날짜 가게 예약 목록 불러오기
      return {
        ...state,
        selectedId:action.id,
      };
    case "SELECT_DATE": //캘린더에서 날짜 선택
      return{
        ...state,
        selectedDate:action.date,
      }
    case "SELECT_CURRENT": //인원, 시간 선택
      return{
        ...state,
        currentSet:action.set,
      }
    case "ADD_SETTING": //가게 예약 가능 날짜 설정
      return {
        ...state,
        // possibleIdxList:action.possibleIdxList,
        reservationList:state.reservationList.map((reservation)=>
          ((reservation.storeId === state.selectedId) && (JSON.stringify(reservation.date) === JSON.stringify(state.selectedDate)))
          ? {
              ...reservation,
              possibleIdxList:action.possibleIdxList
            }
          : reservation
        ),
      };
    case "ADD_RESERVATION": //해당 날짜/시간에 예약 추가
      return{
        ...state,
        reservationList:state.reservationList.map((reservation)=>
          ((reservation.storeId === state.selectedId) && (JSON.stringify(reservation.date) === JSON.stringify(state.selectedDate)))
          ? {
              ...reservation,
              reservedList:reservation.reservedList.concat(action.reserved)
            }
          : reservation
        ),
      };
    case "CANCEL_RESERVATION": //가게 예약 취소
      return{
        ...state,
        reservationList:state.reservationList.map((reservation)=>
          ((reservation.storeId === state.selectedId) && (JSON.stringify(reservation.date) === JSON.stringify(state.selectedDate)))
          ? {
              ...reservation,
              // reservedIdxList:reservation.reservedIdxList.filter(
              //   (index) => index !== action.reservedIdx
              // ),
              reservedList:reservation.reservedList.filter(
                // (index)=>index!==action.reserved.index
                (reserved)=>reserved.index!==action.index
              )
            }
          : reservation
        ),
      };
    default:
      return state;

  }
}

const ReservationInfoStateContext = createContext();
const ReservationInfoDispatchContext = createContext();

export function ReservationInfoProvider({children}){
  const [state, dispatch] = useReducer(ReservationReducer, initialState);
  return (
    <ReservationInfoStateContext.Provider value={state}>
      <ReservationInfoDispatchContext.Provider value={dispatch}>
        {children}
      </ReservationInfoDispatchContext.Provider>
    </ReservationInfoStateContext.Provider>
  );
}

export function useReservationInfoState() {
  return useContext(ReservationInfoStateContext);
}

export function useReservationInfoDispatch() {
  return useContext(ReservationInfoDispatchContext);
}