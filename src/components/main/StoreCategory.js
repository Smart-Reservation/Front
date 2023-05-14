import styled from "styled-components";
import { useStoreInfoState } from "../../context/StoreInfoContext";

const CategoryContainer = styled.div`
    padding:20px;
`

const CategoryText = styled.div`
    padding:10px;
    font-family: 'Pretendard-Regular';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;

`

const FilterButton = styled.button`
    position:absolute;
    right:20px;
    padding:10px;
    box-sizing: border-box;

    position: absolute;

    background: #FFFFFF;
    border: 1px solid #9A9A9A;
    border-radius: 24px;

    font-family: 'Pretendard-Regular';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;

    color: #484848;

`

const AbleDot = styled.div`
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius:50%;
    background-color: #C2C6CC;
    margin:0 15px 0 15px;
`
const ActiveBar = styled.div`
    position:absolute;
    top:50px;
    margin:0 10px 0 10px;
    height:3px;
    width:100%;
    display:block;
    background: #484848;
`
function Category({text,active}) {
    return (
    <div style={{display:"inline-block"}}>
        <CategoryText>
            <span>{text}</span>
            {/* {active ? <ActiveBar /> : <></>} */}    
        </CategoryText>
    </div>);
}

function StoreCategory() {
    const storeList=useStoreInfoState();

    const category=[...new Set(storeList.totalStore.map((store)=>store.category))]

    return (
        <CategoryContainer>
            <Category text="All Store" active={true}/>
            {
                category.map((value,index) =>
                    <span key={value} >
                        <AbleDot />
                        <Category text={value} active={true}/>
                    </span>
                )
            }
            {/* 나중에 주석 처리 */}
            <FilterButton>Filter</FilterButton>
        </CategoryContainer>
    );
}
export default StoreCategory;