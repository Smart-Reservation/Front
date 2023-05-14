import styled from "styled-components"
import {ReactComponent as Heart} from "../../asset/img/Vector.svg"

const StoreBoxContainer=styled.div`
    margin:15px;
    &:hover{
        cursor: pointer;
    }

    &:active{
        filter: brightness(90%);
    }
`

const BoxContainer=styled.div`
    position: relative;
    height: 360px;
    
    ${props=>props.src&&`background-image:url(${props.src});`}
    background-size:cover;
    border-radius: 12px;
`
const DepositText=styled.span`
    position: absolute;
    bottom:0;
    padding:8px;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    background-color:#ffa559;
    border-radius:0 10px 0 10px;
    color: #FFFFFF;    
`
 
const Info=styled.div`
    font-family: 'Montserrat';
    font-style: normal;
    div{ margin: 15px 0 15px 0;}
`

function StoreBox({store,onClick}){
    return (
    <StoreBoxContainer onClick={onClick} >
    <BoxContainer src={store.imgUrl}>
        <Heart style={{position:"absolute", right:0, padding:"10px"}}/>
        <DepositText>
            {(store.deposit).toFixed(3)} BNB
        </DepositText>
    </BoxContainer>
    <Info>
        <div style={{fontWeight: "700", fontSize: "18px",lineHeight: "22px",color:"#484848" }}>{store.storeName}</div>
        <div style={{fontWeight: "500", fontSize: "14px",lineHeight: "17px",color: "#9A9A9A"}}>{store.location}</div>
    </Info>
    </StoreBoxContainer>
    );
}

export default StoreBox