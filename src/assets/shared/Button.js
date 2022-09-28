import styled from "styled-components";

export default function Button({ content, callback }) {
  return <ButtonComponent onClick={callback}>{content}</ButtonComponent>;
}

const ButtonComponent = styled.button`
  background-color: orange;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  color: brown;
  width: 50%;

  height: 50px;
  font-size: 22px;
  transition: all linear 0.5s;

  :hover {
    background-color: brown;
    color: white;
    cursor: pointer;
  }
`;
