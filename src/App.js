import styled from "styled-components";
import { keyframes } from "styled-components";

const Wrapper = styled.div`
  display:flex;
`;

const animation = keyframes`
  0% {
    transform: rotate(0deg);
    border-radius: 0px;
  } 
  50% {
    /* transform: rotate(360deg); */
    border-radius: 100px;
  }
  100% {
    transform: rotate(360deg);
    border-radius: 0px;
  }
`;

const Box = styled.div`
  height: 100px;
  width: 100px;
  background-color: tomato;
  animation: ${animation} 1s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 28px;
    cursor: pointer;
    &:hover {
      font-size: 42px;
    }
  }
`;


function App() {
  return (
    <Wrapper>
      <Box>
        <span>😊</span>
      </Box>
    </Wrapper>
  );
}

export default App;
