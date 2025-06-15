import { createGlobalStyle } from "styled-components";
import Router from "./routes/Router";
import { Reset } from "styled-reset";
import { ReactQueryDevtools } from "react-query/devtools";

const GlobalStyle = createGlobalStyle`
body {
  font-family: "Inter", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
}
a {
  text-decoration: none;
  color: inherit;
}
* {
  box-sizing: border-box;
}
`;

function App() {
  return (
    <>
      <Reset />
      <GlobalStyle></GlobalStyle>
      <Router></Router>
      <ReactQueryDevtools initialIsOpen={true}></ReactQueryDevtools>
    </>
  );
}

export default App;