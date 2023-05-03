import styled from "styled-components";
import StoreBoxList from "../components/main/StoreBoxList";
import StoreCategory from "../components/main/StoreCategory";

const MainContainer=styled.div`
    position:absolute;
    width:70vw;
    margin:10px 15vw 0 15vw;
`

const StoreBoxListContainer = styled.div`


`
function MainPage() {
    return (
        <MainContainer>
        {/* <div>header</div>// */}
        <StoreCategory/>
        <StoreBoxListContainer>
            <StoreBoxList />
        </StoreBoxListContainer>
        </MainContainer>
    );
}

export default MainPage;