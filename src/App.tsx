import { createGlobalStyle } from "styled-components";
import Router from "./routes/Router";
import { Reset } from "styled-reset";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './theme';
import { useState } from "react";
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from "./atoms";

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
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <Reset />
        <GlobalStyle></GlobalStyle>
        <Router></Router>
        <ReactQueryDevtools initialIsOpen={true}></ReactQueryDevtools>
      </ThemeProvider>
    </>
  );
}

export default App;