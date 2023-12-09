import {ChangeEvent, useEffect, useState} from 'react'
import './App.css'
import styled from "styled-components";
import {useCookies} from "react-cookie";
import CountDown from "./components/CountDown.tsx";

const CookieName = 'birthdate';

const DateInputStyled = styled.input`
  margin: 1rem 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;

  &:invalid {
    border: 1px solid red;
  }
`;
const SubmitStyled = styled.button`
  padding: 0.25rem 0.5rem;
  margin: 1rem 0.5rem;
  border: 1px solid rgb(255, 255, 255, 0.7);

  &:hover {
    border-color: rgb(255, 255, 255, 0.6);
    opacity: 0.8;
  }
`;

function App() {
  const [cookies, setCookie] = useCookies([CookieName]);

  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [birthDate, setBirthdDate] = useState<string>();
  const [correctBirthDate, setCorrectBirthdDate] = useState<string>();

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBirthdDate(event.target.value);
  }

  const handleSubmit = () => {
    setCorrectBirthdDate(birthDate);
    setIsSettingsVisible(false);
  }

  const handleSettingsClick = () => {
    setIsSettingsVisible(true);
  }

  useEffect(() => {
    if (!correctBirthDate) {
      return;
    }
    setCookie(CookieName, correctBirthDate);
  }, [correctBirthDate, setCookie]);

  useEffect(() => {
    const birthdayFromCookie = cookies.birthdate;
    if (!birthdayFromCookie) {
      return;
    }
    const parsedTimestamp = new Date(birthdayFromCookie).getTime();
    if (Number.isNaN(parsedTimestamp)) {
      return;
    }
    setCorrectBirthdDate(birthdayFromCookie);
  }, [cookies.birthdate]);

  if (!correctBirthDate || isSettingsVisible) {
    return (
      <>
        <div>
          <label>
            Enter your birthday:
            <DateInputStyled type="date" onChange={handleDateChange} max="2030-01-01" />
          </label>
        </div>

        <SubmitStyled onClick={handleSubmit}>Submit</SubmitStyled>
      </>
    )
  }

  return (
    <CountDown birthdate={correctBirthDate} showSettings={handleSettingsClick} />
  )
}

export default App
