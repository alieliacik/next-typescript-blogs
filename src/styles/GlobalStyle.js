
import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  html {
    box-sizing: border-box;
     font-size:62.5%;         /* 1rem = 10px; */
    @media (max-width: 55em){
      font-size: 55%;         /* 1rem = 8.8px; */ 
    }
    @media (max-width: 52em){
      font-size: 50%;         /* 1rem = 8px; */
    }
  }
  body {
    font-family: 'Roboto', sans-serif;
  }
`