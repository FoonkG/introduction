import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

html, body{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
}

button, input {

  border: none;
  outline: none;
}

button{
  cursor: pointer;

  &:hover{
    filter: brightness(130%);
  }
}

*{
    font-family: 'Inter', sans-serif;

    box-sizing: border-box;
  
    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
  
    -webkit-user-drag: none;
  
    transition: background ease 0.3s, fill ease 0.1s, background-color ease 0.3s, color ease 0.05s, border ease 0.3s, transform ease 0.3s, stroke ease 0.3s, filter ease 0.3s, fill ease 0.3s, stroke-opacity ease 0.3s, left ease 0.3s, right ease 0.3s, position ease 0.3s;
  }
`;

export default GlobalStyle;
