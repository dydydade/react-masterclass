import styled from "styled-components";

const Father = styled.div`
  display:flex;
`;

const Button = styled.button`
  color: white;
  background-color: tomato;
  border: 0;
  border-radius: 15px;
  padding: 20px;
`;

const Input = styled.input.attrs({ required: true })`
  background-color: skyblue;
`;

function App() {
  return (
    <Father>
      <Input></Input>
      <Button>Submit</Button>
      <Button as="a">Link</Button>
    </Father>
  );
}

export default App;
