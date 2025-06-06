import styled from "styled-components";
import { keyframes } from "styled-components";

const Wrapper = styled.div`
  background-color: ${props => props.theme.backgroundColor};
  width: 100vw;
  height: 100vh;
  display:flex;
  justify-content: center;
  align-items: center;
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

const Emoji = styled.span`
    font-size: 28px;
    cursor: pointer;
`

const Box = styled.div`
  height: 100px;
  width: 100px;
  background-color: ${props => props.theme.textColor};
  animation: ${animation} 1s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  ${Emoji}:hover {
    font-size: 42px;
  }
`;


function App() {
  return (
    <Wrapper>
      <Box>
        <Emoji as="p">😊</Emoji>
      </Box>
      <Emoji as="p">🚀</Emoji>
    </Wrapper>
  );
}

export default App;
