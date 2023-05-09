import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

interface IModal {
  isOpen: boolean;
  onClose: () => void;
}

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const Label = styled.label`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  color: white;
  background-color: #0077cc;
  border-radius: 5px;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Modal: React.FC<IModal> = ({ isOpen, onClose }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<string>("");
  const [text, setText] = useState<string>("");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDate(new Date(e.target.value));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const chosenHour = e.target.value.slice(0, 2);
    setTime(`${chosenHour}:00`);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };

  const handleSubmit = (): void => {
    const key = `${date.toISOString().split("T")[0]}-${time.split(":")[0]}`;
    console.log(key);
    localStorage.setItem(key, text);
    onClose();
  };

  return isOpen
    ? ReactDOM.createPortal(
        <ModalWrapper onClick={onClose}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <Label htmlFor="date-input">Date:</Label>
            <Input
              type="date"
              id="date-input"
              value={date.toISOString().split("T")[0]}
              onChange={handleDateChange}
            />
            <Label htmlFor="time-input">Time (in hours):</Label>
            <Input
              type="time"
              id="time-input"
              value={time}
              onChange={handleTimeChange}
            />
            <Label htmlFor="text-input">Text:</Label>
            <Input
              type="text"
              id="text-input"
              value={text}
              onChange={handleTextChange}
            />
            <ButtonsWrapper>
              <Button type="button" onClick={handleSubmit}>
                Submit
              </Button>
              <Button type="button" onClick={onClose}>
                Cancel
              </Button>
            </ButtonsWrapper>
          </ModalContent>
        </ModalWrapper>,
        document.body
      )
    : null;
};

export default Modal;
