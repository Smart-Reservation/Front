import styled from "styled-components";
import StoreBox from "./StoreBox";
import { useStoreInfoDispatch, useStoreInfoState } from "../../context/StoreInfoContext";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useReservationInfoDispatch } from "../../context/ReservationInfoContext";

const BoxListContainer = styled.div`
    width:100%;
    display:grid;
    grid-template-columns: repeat(3, 1fr);
`


function StoreBoxList(){
    const storeList=useStoreInfoState();
    const storeDispatch=useStoreInfoDispatch();
    const reservationDispatch=useReservationInfoDispatch();
    const nav = useNavigate();
    const onClick=(id)=>{
        storeDispatch({type:"SELECT_STORE",id:id}) //
        reservationDispatch({type:"LOAD_STORE_RESERVATION",id:id})
        nav("/ReservationPage")
    }
    useEffect(()=>{
        axios.get(`http://${process.env.REACT_APP_SERVER_HOST}/store/list`)
        .then((res)=>{
            const totalStore=res.data.map((store)=>({
                id:store.id,
                category:store.category,
                imgUrl:store.imgUrl,
                storeName:store.storeName,
                location:store.location,
                deposit:store.deposit,
                periodList:["10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"]
            }));
            storeDispatch({type:"LOAD_STORE_LIST",totalStore:totalStore});
        })
    },[]);
    
    return (
    <BoxListContainer>
        {
            storeList.totalStore.map((store,index)=>(<StoreBox key={index} store={store} onClick={()=>{onClick(store.id)}}/>))
        }
    </BoxListContainer>
    );
}

export default StoreBoxList