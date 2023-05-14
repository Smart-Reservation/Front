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
    const reservationState = useReservationInfoState();
    const reservationDispatch = useReservationInfoDispatch();
    const userDispatch = useUserInfoDispatch();
    const nav = useNavigate();
    const onClick = (id) => {
        storeDispatch({ type: "SELECT_STORE", id: id })
        axios.get(`http://${process.env.REACT_APP_SERVER_HOST}/reservation/list/${id}`).then((res) => {
            reservationDispatch({
                type: "LOAD_STORE_RESERVATION",
                reservationList: res.data,
                id: id
            })
        })
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