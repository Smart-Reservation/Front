import styled from "styled-components";
import StoreBoxList from "../components/main/StoreBoxList";
import StoreCategory from "../components/main/StoreCategory";
import Header from "../components/header/Header";


const MainContainer=styled.div`

`

const StoreBoxListContainer = styled.div`
    position:absolute;
    width:70vw;
    margin:10px 15vw 0 15vw;
`
function MainPage() {
    return (
        <MainContainer>
        <Header/>
        <StoreBoxListContainer>
            <StoreCategory/>
            <StoreBoxList />
        </StoreBoxListContainer>
        </MainContainer>
    );
}

export default MainPage;


