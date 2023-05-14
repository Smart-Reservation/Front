import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";

const DateContainer = styled.div`
  border: 1px solid white;
  background-color: ${(props) => (props.isactive ? "#FFA559" : "white")};
  width: 4em;
  height: 3em;
  border-radius: 10px;

  font-family:'Pretendard-Regular';
  font-style: normal;
  font-weight: 300;
  font-size: 0.84em;
  line-height: 3em;
  text-align: center;
  ${(props) =>
    props.disable &&
    `
        color:'gray';
        background-color: #FFE6d0;
    `}

  ${(props) =>
    !props.isactive &&
    props.isDate &&
    !props.disable &&
    `&:hover{
        display: inline-block;
        background-color: #FF6000;
        width:4em;
        height:3em;
        cursor:pointer;
        }`}
`;

function Day({
  date,
  onClickDay,
  onClickEmpty,
  isDate,
  selectedDate,
  disable,
}) {
  return (
    <DateContainer
      onClick={isDate ? onClickDay : onClickEmpty}
      disable={disable}
      isDate={isDate}
      isactive={
        isDate && !disable ? selectedDate?.getDate() === date.getDate()  : false
      }
    >
      {isDate ? date.getDate() : date}
    </DateContainer>
  );
}
export default Day;
