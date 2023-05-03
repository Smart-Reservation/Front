import styled from "styled-components"
import {ReactComponent as Heart} from "../../asset/img/Vector.svg"

const StoreBoxContainer=styled.div`
    margin:15px;
`

const BoxContainer=styled.div`
    position: relative;
    height: 360px;
    background: #E0E2E6;
    border-radius: 12px;
`
const DepositText=styled.span`
    position: absolute;
    bottom:0;
    padding:10px;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;

    color: #9A9A9A;    
`

const Info=styled.div`
    font-family: 'Montserrat';
    font-style: normal;
    div{ margin: 15px 0 15px 0;}
`

function StoreBox(){
    return (
    <StoreBoxContainer>
    <BoxContainer>
        <Heart style={{position:"absolute", right:0, padding:"10px"}}/>
        <DepositText>
            0.025 BNB
        </DepositText>
    </BoxContainer>
    <Info>
        <div style={{fontWeight: "700", fontSize: "18px",lineHeight: "22px",color:"#484848" }}>Store 1</div>
        <div style={{fontWeight: "500", fontSize: "14px",lineHeight: "17px",color: "#9A9A9A"}}>Location 1</div>
    </Info>
    </StoreBoxContainer>
    );
}

export default StoreBox