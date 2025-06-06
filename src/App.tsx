import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`

const H1 = styled.h1`
  color: ${(props) => props.theme.textColor};
`

function App() {
  const [value, setValue] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { currentTarget: { value } } = event;
    setValue(value);
  }
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("hello ", value);
  }
  return (
    <div>
      <Container>
        <H1>Protected</H1>
      </Container>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={value} type="text" placeholder="username"></input>
        <button>Log in</button>
      </form>
    </div>
  );
}

export default App;
