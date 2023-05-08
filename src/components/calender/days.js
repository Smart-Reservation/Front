import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

const DateContainer = styled.div`
    border:1px solid white;
    background-color: ${(props)=>props.isactive?'gray':'white'};
    width:4em;
    height:3em;
    border-radius:10px;
    
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 3em;
    text-align: center;
    ${(props)=>props.disable&&`
        color:'gray';
        background-color: lightGray;
    `}
    
    ${
        (props)=> !props.isactive&&props.isDate && `&:hover{
        display: inline-block;
        background-color: lightGray;
        width:4em;
        height:3em;
        cursor:grab;
        }`   
    }
`

function Day({ date, onClickDay, onClickEmpty, isDate,selectedDate ,disable}) {
    return (
        <DateContainer 
        onClick={isDate ? onClickDay : onClickEmpty}
        disable={disable}
        isDate={isDate}
        isactive={isDate&&!disable?selectedDate?.getDate()===date.getDate():false}>

            {isDate ? date.getDate() : date}
        </DateContainer>
    )
}
export default Day;