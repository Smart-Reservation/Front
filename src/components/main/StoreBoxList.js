import styled from "styled-components";
import StoreBox from "./StoreBox";

const BoxListContainer = styled.div`
    width:100%;
    display:grid;
    grid-template-columns: repeat(3, minmax(20%, auto));
`
const list=[1,2,3,4,5,6,7,8,9]

function StoreBoxList(){
    return (
    <BoxListContainer>
        {list.map((index)=><StoreBox key={index}/>)}
    </BoxListContainer>
    );
}

export default StoreBoxList