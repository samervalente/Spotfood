import styled from "styled-components";

export default function Button({ content, callback, width }) {
  return <ButtonComponent widht={width} onClick={callback}>{content}</ButtonComponent>;
}

const ButtonComponent = styled.button`
  background-color: red;
  color:white;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  width: ${props => props.width};

  height: 30px;
  font-size: 16px;
  transition: all linear 0.5s;

  :hover {
    background-color: brown;
    color: white;
    cursor: pointer;
  }
`;
