import styled from "styled-components";

export default function Input({
  placeholder,
  type,
  onChange,
  datacy,
  required,
}) {
  return (
    <InputComponent
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      datacy={datacy}
      required={required}
    />
  );
}

const InputComponent = styled.input`
  border-radius: 8px;
  border: 2px solid white;
  margin: 10px 0px;
  height: 35px;
  width: 80%;
  background-color: red;
  color: white;
  padding: 10px;

  ::placeholder {
    color: white;
  }
`;
