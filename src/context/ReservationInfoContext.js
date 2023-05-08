import React, { useReducer, createContext, useContext } from "react";

const initialState={
  reservationList:[
    {
      storeId:1,
      date:{
        year:2023,
        month:5,
        day:5
      },
      possibleIdxList:[0,2,3], //1,4 제외한 나머지 0,2,3시간대만 예약가능 
      // reservedIdxList:[0,3] //0,2,3,4 시간대 중 0,3 은 이미 예약됨 {address:"",numbers:4,index:} 로 수정해야 하나
      reservedList:[
        {
          address:"0xE2C20E354D8841EccA194B68506DA81827726e30",
          number:2,
          index:0
        },
        {
          address:"0xE2C20E354D8841EccA194B68506DA81827726e30",
          number:1,
          index:3

        }
      ]
    },
  ],
  selectedId:1, //선택된 가게 ID
  selectedDate:{
    year:2023,
    month:5,
    day:5
  },
  currentSet:{
    address:"0xE2C20E354D8841EccA194B68506DA81827726e30",
    number:2,
    index:0
  }
};

function ReservationReducer(state, action){
  switch(action.type){
    case "LOAD_STORE_RESERVATION": //해당 날짜 가게 예약 목록 불러오기
      return {
        ...state,
        selectedId:action.id,
        selectedDate:action.date,
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
    case "ADD_RESERVATION": //해당 날짜/시간에 예약 추가
      return{
        ...state,
        reservationList:state.reservationList.map((reservation)=>
          ((reservation.storeId === state.selectedId) && (reservation.date === state.selectedDate))
          ? {
              ...reservation,
              // reservedIdxList:reservation.reservedIdxList.concat(action.reservedIdx),
              reservedList:reservation.reservedList.concat(action.reservedList)
            }
          : reservation
        ),
      };
    case "CANCEL_RESERVATION": //가게 예약 취소
      return{
        ...state,
        reservationList:state.reservationList.map((reservation)=>
          ((reservation.storeId === state.selectedId) && (reservation.date === state.selectedDate))
          ? {
              ...reservation,
              // reservedIdxList:reservation.reservedIdxList.filter(
              //   (index) => index !== action.reservedIdx
              // ),
              reservedList:reservation.reservedList.filter(
                (index)=>index!==action.reserved.index
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