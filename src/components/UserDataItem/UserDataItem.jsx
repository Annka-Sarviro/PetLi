import { useState } from "react";
import { useUpdateUserMutation } from "redux/userApi";
import { EditTextBtn, EditTextBtnIcon, IconCheck, UserDataInput, ErrorText } from "./UserDataItem.styled";

const UserDataItem = ({ name, defaultValue, type, pattern, errorText }) => {
  const [active, setActive] = useState(false);
  const [inputeValue, setInputeValue] = useState(defaultValue ?? "");
  const [editUserInfo] = useUpdateUserMutation();
  const [isValid, setIsValid] = useState(true);

  const onInputeChange = e => {
    setInputeValue(e.target.value);
  };

  const handleClick = e => {
    e.preventDefault();
    const isValidValue = pattern.test(inputeValue);
    if (!isValidValue) {
      setIsValid(false);
      return;
    }
    if (active === true && inputeValue.length !== 0) {
      setActive(false);
      if (inputeValue === defaultValue) {
        return;
      }
      const data = {
        [name]: inputeValue,
      };
      setIsValid(true);
      editUserInfo({ name, data });
      return;
    }
    setIsValid(true);
    setActive(true);
  };

  return (
    <>
      <UserDataInput disabled={!active} onChange={onInputeChange} name={name} type={type} pattern={pattern} value={inputeValue} />
      <EditTextBtn onClick={handleClick}>{active ? <IconCheck /> : <EditTextBtnIcon />}</EditTextBtn>
      {!isValid && <ErrorText>{errorText}</ErrorText>}
    </>
  );
};

export default UserDataItem;
