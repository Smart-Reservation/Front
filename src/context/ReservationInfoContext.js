import React, { useReducer, createContext, useContext } from "react";

const now = new Date();
const initialState = {
  reservationList: [
    {
      storeId: 1,
      date: {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate(),
      },
      impossibleIdxList: [], 
      reservedList: [],
    },
  ],
  selectedId: 1, //선택된 가게 ID
  selectedDate: {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
  },
  currentSet: {
    address: "0xE2C20E354D8841EccA194B68506DA81827726e30",
    numbers: 2,
    index: 0,
  },
};

function ReservationReducer(state, action) {
  switch (action.type) {
    case "LOAD_STORE_RESERVATION": //해당 날짜 가게 예약 목록 불러오기
      return {
        ...state,
        reservationList:action.reservationList,
        selectedId: action.id,
      };
    case "SELECT_DATE": //캘린더에서 날짜 선택
      return {
        ...state,
        selectedDate: action.date,
      };
    case "SELECT_CURRENT": //인원, 시간 선택
      return {
        ...state,
        currentSet: action.set,
      };
    case "ADD_SETTING": //가게 예약 가능 날짜 설정
      return {
        ...state,
        reservationList: state.reservationList.map((reservation) =>
          reservation.storeId === state.selectedId &&
          JSON.stringify(reservation.date) ===
            JSON.stringify(state.selectedDate)
            ? {
                ...reservation,
                impossibleIdxList: action.impossibleIdxList,
              }
            : reservation
        ),
      };
    case "ADD_DATE":
      let exist = false;
      state.reservationList.forEach((reservation) => {
        if (
          JSON.stringify(reservation.date) === JSON.stringify(action.date) &&
          reservation.storeId === action.id
        ) {
          exist = true;
        }
      });
      if (exist) {
        return {...state,selectedDate:action.date};
      } else
        return {
          ...state,
          reservationList: state.reservationList.concat(
            {
                storeId: action.id,
                date: action.date,
                impossibleIdxList: [],
                reservedList: []
            }
          ),
          selectedDate:action.date,
        };
    case "ADD_RESERVATION": //해당 날짜/시간에 예약 추가
      return {
        ...state,
        reservationList: state.reservationList.map((reservation) =>
          reservation.storeId === state.selectedId &&
          JSON.stringify(reservation.date) ===
            JSON.stringify(state.selectedDate)
            ? {
                ...reservation,
                reservedList: reservation.reservedList.concat(action.reserved),
              }
            : reservation
        ),
      };
    case "CANCEL_RESERVATION": //가게 예약 취소
      return {
        ...state,
        reservationList: state.reservationList.map((reservation) =>
          reservation.storeId === state.selectedId &&
          JSON.stringify(reservation.date) ===
            JSON.stringify(state.selectedDate)
            ? {
                ...reservation,
                reservedList: reservation.reservedList.filter(
                  (reserved) => reserved.index !== action.index
                ),
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

export function ReservationInfoProvider({ children }) {
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
