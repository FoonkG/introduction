import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

html, body{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
}

*{
  font-family: 'Montserrat', sans-serif;

    box-sizing: border-box;
  
    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
  
    -webkit-user-drag: none;
  
    transition: background ease 0.3s, background-color ease 0.3s, color ease 0.05s, border ease 0.3s, transform ease 0.3s, fill ease 0.3s, stroke ease 0.3s, stroke ease 0.3s, fill ease 0.3s, top ease 0.3s, filter ease 0.3s, border ease 0.3s;
  }

  button {
    outline: none;
    border: none;
    cursor: pointer;
  }

  input {
    outline: none;

    height: 36px;

    background: linear-gradient(0deg, #232326, #232326), #141421;
    border: 1px solid #2A292E;
    border-radius: 5px;

    font-weight: 600;
    font-size: 12px;

    color: #878787;

    padding-inline: 24px;
  }

  button{
    outline: none;
    border: none;
    cursor: pointer;

    transition: all 100ms ease-in-out;
    -webkit-filter: brightness(100%);

    &:hover {
      cursor: pointer;
      -webkit-filter: brightness(92%);
    }
  }

  div::-webkit-scrollbar {
    width: 0;
  }
`;

export default GlobalStyle;
