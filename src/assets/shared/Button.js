import styled from "styled-components";

export default function Button({ content, onClick, width, type }) {
  return (
    <ButtonComponent width={width}type={type} onClick={onClick}>{content}</ButtonComponent>
  )
}

const ButtonComponent = styled.button`
  background-color: red;
  color:white;
  border: none;
  border-radius: 5px;
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
