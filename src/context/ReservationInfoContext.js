import React, { useReducer, createContext, useContext } from "react";

const initialState={
  totalStore: [
    {
      id:1,
      category:"food",
      storeName: "store1",
      location:"",
      deposit:"0.025",
      imgUrl:"store/img/1",
      periodList:[
        {
          index:1,
          startTime:"10:00",
          endTime:"11:00"
        },
        { index:2,
          startTime:"11:00",
          endTime:"12:00"
        },
        {
          index:3,
          startTime:"12:00",
          endTime:"13:00"
        }
      ],
      possibleList:[1,2],
      impossibleList:[3],
      reservationList:[],
    },
  ],
  selectedId:1, //선택된 가게 ID
};

function ReservationReducer(state, action){
  switch(action.type){
    case "LOAD_STORE_RESERVATIONS": //가게 예약 목록 불러오기
      return {
        ...state,
        selectedId:action.id,
        
      };
    case "ADD_STORE_RESERVATION": //가게 예약 추가
      return{
        ...state,
        totalStore:state.totalStore.map((store)=>
        store.id === state.selectedId
          ? {
              ...store,
              reservationList:store.reservationList.concat(action.reservation),
            }
          : store
        ),
      };
    case "CANCEL_STORE_RESERVATION": //가게 예약 취소
      return{
        ...state,
        totalStore:state.totalStore.map((store)=>
          store.id === state.selectedId
          ? {
              ...store,
              reservationList:store.reservationList.filter(
                (reservation) => reservation.id !== action.id
              ),
            }
          : store
        ),
      };
    case "CONFIRM_STORE_RESERVATION": //가게 예약 확정(예약 편집) -> contract
    return{
      ...state,
      totalStore:state.totalStore.map((store)=>
        store.id === state.selectedId
        ? {
            ...store,
            reservationList:state.reservationList.map((reservation)=>
              reservation.id === action.id ? action.reservation : reservation
            ),
          }
        :store
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