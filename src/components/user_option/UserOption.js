import { useState } from "react";
import styled from "styled-components";
import UserReservationList from "./UserReservationList";

const UserOptionContainer=styled.div`
  width:12vw;
  height:5vh;
  margin:10px;

  position:absolute;
  top:3.5em;
  right:7em;

  background: #ffffff;
  box-shadow: 0px 0px 8px rgba(194, 198, 204, 0.6);
  border-radius: 6px;

  font-family:'Pretendard-Regular';
  font-style: normal;
  font-weight: 600;
  font-size: 1.2em;
  line-height: 2em;

  text-align: center;
  z-index:1;

  color: black;
  &:hover {
    background-color: rgba(255, 230, 199, 0.4); 
  }
  &:active {
    background-color: #ffa559;
  }
`;

function UserOption(){
  const [clicked,setClicked]=useState(false);
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