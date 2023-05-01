import {  useState } from "react";
import styled, { css } from "styled-components";

//styled-components

const Container = styled.div`
`;
const ContentBox = styled(Container)`
  ${(props)=>
    props.clicked
      ? css`
        `
      : css`
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          padding: 4px 16px;
          gap: 8px;
          
          width: 459px;
          height: 32px;
          
          
          /* Inside auto layout */
          
          flex: none;
          order: 4;
          align-self: stretch;
          flex-grow: 0;
        `
  }
`;

function Period({period}){
  const [clicked, setClicked] = useState(false);

    return (
      <Container>
        <ContentBox clicked={clicked}>
          <div>
            {period.startTime} ~ {period.endTime}
          </div>
        </ContentBox>
      </Container>
    )
}
export default Period;