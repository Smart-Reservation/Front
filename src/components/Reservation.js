import styled from "styled-components";

//styled component
const Container=styled.div``;
const ContentBox=styled.div``;

function Reservation({ reservation, onClick, index, clicked }) {
  return (
    <Container onClick={()=>onClick(index)}>
      <ContentBox clicked={clicked} >
        <div>
          {reservation}
        </div>
      </ContentBox>
    </Container>
  )
}

export default Reservation;