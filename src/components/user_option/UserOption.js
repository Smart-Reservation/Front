import { useState } from "react";
import styled from "styled-components";
import UserReservationList from "./UserReservationList";

const UserOptionContainer=styled.div`
  width:12vw;
  height:5vh;
  margin:10px;

  position:absolute;
  top:3.5em;
  right:14em;

  background: #FFFFFF;
  box-shadow: 0px 0px 8px rgba(194, 198, 204, 0.6);
  border-radius: 6px;

  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 30px;
  text-align: center;
  z-index:1;

  color: #484848;  
  &:hover {
    background-color: rgba(84, 69, 93, 0.2);  
  }
  &:active {
    background-color: rgba(84, 69, 93, 0.5);
  }
`;

function UserOption(){
  const [clicked,setClicked]=useState(false);
  // const onClick=()=>{
  //   setClicked(true);
  // }

  // const Close=()=>{
  //   setClicked(false);
  // }
  return(
    <>
      <UserOptionContainer onClick={()=>setClicked(true)}>
        Reservation List
      </UserOptionContainer>
      {clicked?<UserReservationList Close={()=>setClicked(false)}/>:<></>}
    </>
  );
}

export default UserOption;