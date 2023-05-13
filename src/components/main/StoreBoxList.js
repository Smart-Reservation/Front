import styled from "styled-components";
import StoreBox from "./StoreBox";
import { useStoreInfoDispatch, useStoreInfoState } from "../../context/StoreInfoContext";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useReservationInfoDispatch, useReservationInfoState } from "../../context/ReservationInfoContext";
import { useUserInfoDispatch } from "../../context/UserInfoContext";

const BoxListContainer = styled.div`
    width:100%;
    display:grid;
    grid-template-columns: repeat(3, 1fr);
`
const now = new Date();

function StoreBoxList() {
    const storeState = useStoreInfoState();
    const storeDispatch = useStoreInfoDispatch();
    const reservationState=useReservationInfoState();
    const reservationDispatch = useReservationInfoDispatch();
    const userDispatch = useUserInfoDispatch();
    const nav = useNavigate();
    const onClick = (id) => {
        storeDispatch({ type: "SELECT_STORE", id: id })
        const reservationlist=[];
        axios.get(`http://${process.env.REACT_APP_SERVER_HOST}/reservation/list/${id}`).then((list) => {
            list.data.forEach((data) => {
                const date = new Date(data.time);
                reservationDispatch({
                    type: "ADD_DATE", id: id, date: {
                        year: date.getFullYear(),
                        month: date.getMonth() + 1,
                        day: date.getDate()
                    }
                })
                /** @todo 비동기 수정해야함 */
                reservationDispatch({
                    type: "ADD_RESERVATION", reserved:
                    {
                        address: data.address,
                        numbers: data.number,
                        index: storeState.totalStore.find((store) => store.id === id).periodList.indexOf(date.getHours().toString() + ":00")
                    }
                })
                // reservationlist.push({
                //     storeId: id,
                //     date: {
                //         year: date.getFullYear(),
                //         month: date.getMonth() + 1,
                //         day: date.getDate()
                //     },
                //     numbers: data.number,
                //     index: storeState.totalStore.find((store) => store.id === id).periodList.indexOf(date.getHours().toString() + ":00")
                // })
            })
            // userDispatch({
            //     type: "LOAD_USER_RESERVATIONS",
            //     reservationList: reservationlist
            // })

        })
        axios.post(`http://${process.env.REACT_APP_SERVER_HOST}/reservation/unavailable`,{
            id : id,
            date : reservationState.selectedDate.year+"-"+reservationState.selectedDate.month+"-"+reservationState.selectedDate.day
        }).then((list) => {
            const unavailableIdxList=list.data.map((unavailable)=>{
                const date=new Date(unavailable)
                const storePeriods =storeState.totalStore.find((store) => store.id === id).periodList
                return storePeriods.indexOf(date.getHours().toString() + ":00")
            })
            reservationDispatch({
                type:"ADD_SETTING",
                impossibleIdxList:unavailableIdxList
            })
            
        })

        reservationDispatch({ type: "LOAD_STORE_RESERVATION", id: id })

        nav("/ReservationPage")

    }

    return (
        <BoxListContainer>
            {
                storeState.totalStore.map((store, index) => (<StoreBox key={index} store={store} onClick={() => { onClick(store.id) }} />))
            }
        </BoxListContainer>
    );
}

export default StoreBoxList