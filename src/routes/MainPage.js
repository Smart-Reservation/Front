import styled from "styled-components";
import StoreBoxList from "../components/main/StoreBoxList";
import StoreCategory from "../components/main/StoreCategory";
import Header from "../components/header/Header";
import { useEffect } from "react";
import axios from "axios";
import { useStoreInfoDispatch } from "../context/StoreInfoContext";

const StoreBoxListContainer = styled.div`
  position: absolute;
  width: 70vw;
  margin: 10px 15vw 0 15vw;
`;
function MainPage() {
  const storeDispatch=useStoreInfoDispatch();
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
    <div>
      <Header />
      <StoreBoxListContainer>
        <StoreCategory />
        <StoreBoxList />
      </StoreBoxListContainer>
    </div>
  );
}

export default MainPage;
