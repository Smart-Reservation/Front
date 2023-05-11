import styled from "styled-components";

//styled-components

const Container = styled.div`
  width: 100%;
  &:hover {
    cursor: pointer;
  }
`;
const ContentBox = styled.div`
  height: 32px;

  display: flex;
  padding: 4px 16px;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;

  align-items: center;
  justify-content: center;

  background: ${(props) => (props.clicked ? "#FFE6C7" : "white")};

  ${(props) =>
    props.clicked
      ? ""
      : `&:hover {
    background-color: beige;
  }`}
`;

function Period({ period, onClick, clicked }) {
  return (
    <Container onClick={onClick}>
      <ContentBox clicked={clicked}>{period}</ContentBox>
    </Container>
  );
}
export default Period;
