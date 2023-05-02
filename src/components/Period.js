import { useState, useEffect } from "react";
import styled, { css } from "styled-components";

//styled-components

const Container = styled.div``;
const ContentBox = styled(Container)`
  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 4px 16px;
  gap: 8px;

  width: 459px;
  height: 32px;

  background: ${(props) => (props.clicked ? "#E0E2E6" : "white")};
  text-align: center;

  /* Inside auto layout */

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  ${(props)=>props.clicked?"":`&:hover {
    background-color: rgba(55, 53, 47, 0.05);
  }`}
`;

function Period({ period, onClick, index, clicked }) {
  return (
    <Container onClick={()=>onClick(index)}>
      <ContentBox clicked={clicked} >
        <div>
          {period.startTime} ~ {period.endTime}
        </div>
      </ContentBox>
    </Container>
  );
}
export default Period;
