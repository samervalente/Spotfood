import styled from "styled-components";


const ButtonDefault = styled.button`
  background-color:red;
  color:white;
  border: none;
  border-radius: 5px;
  width: ${props => props.width};
  display: flex;
  justify-content: center;
  align-items: center;

  height: 30px;
  font-size: 1em;
  transition: all linear 0.5s;

  :hover {
    background-color: brown;
    color: white;
    cursor: pointer;
  }
`;

const ButtonGreen = styled(ButtonDefault)`
background-color: green;

`

export {ButtonDefault, ButtonGreen}

