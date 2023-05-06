import styled from "styled-components";
import StoreBox from "./StoreBox";
import { useStoreInfoDispatch, useStoreInfoState } from "../../context/StoreInfoContext";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BoxListContainer = styled.div`
    width:100%;
    display:grid;
    grid-template-columns: repeat(3, 1fr);
`


function StoreBoxList(){
    const storeList=useStoreInfoState();
    const storeDispatch=useStoreInfoDispatch();
    const nav = useNavigate();
    const onClick=(id)=>{
        storeDispatch({type:"LOAD_STORE_RESERVATION",id:id})
        nav("/ReservationPage")
    }
    useEffect(()=>{
        axios.get(`http://${process.env.REACT_APP_SERVER_HOST}/store/list`)
        .then((res)=>{
            const totalStore=res.data.map((store)=>({
                id:store.id,
                imgUrl:store.imgUrl,
                storeName:store.store_name,
                location:store.location,
                deposit:store.deposit,
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