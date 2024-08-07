import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import gearLogo from '../assets/gear-icon.svg';

interface Props {
  birthdate: string;
  showSettings: () => void;
}

const SettingsIconContainer = styled.div`
    position: relative;;
`;
const SettingsIcon = styled.img`
    position: absolute;
    right: 0;
    bottom: 10vh;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
`;

const TimeBeforeBirthdayTitle = styled.div`
    font-size: 2rem;
`;
const CountdownContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 1rem;
    margin-top: 2rem;
`;
const CountdownNumber = styled.div`
    //line-height: 2rem;
    min-height: 3rem;
    font-size: 2rem;
`;
const CountdownColumnName = styled.div`
    font-size: 0.75rem;
`;

const BirthdayDate = styled.div`
    font-family: monospace;
    //margin-top: 1rem;
    margin-bottom: 2rem;
`;


const CountDown = ({ birthdate, showSettings }: Props) => {
  const [remainingDays, setRemainingDays] = useState<number>();
  const [remainingHours, setRemainingHours] = useState<number>();
  const [remainingMinutes, setRemainingMinutes] = useState<number>();
  const [remainingSeconds, setRemainingSeconds] = useState<number>();

  const birthdayFormatted = new Date(birthdate).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  const calculateNumbers = useCallback(() => {
    const parsedBirthday = new Date(birthdate);
    const birthdateDay = parsedBirthday.getDate();
    const birthdateMonth = parsedBirthday.getMonth();

    const today = new Date();

    let isNextBirthDateThisYear = false;

    if (today.getMonth() < birthdateMonth) {
      isNextBirthDateThisYear = true;
    }
    if (today.getMonth() === birthdateMonth && today.getDate() < birthdateDay) {
      isNextBirthDateThisYear = true;
    }

    let nextBirthDate = '';
    if (isNextBirthDateThisYear) {
      nextBirthDate = `${today.getFullYear()}-${birthdateMonth + 1}-${birthdateDay}`;
    } else {
      nextBirthDate = `${today.getFullYear() + 1}-${birthdateMonth + 1}-${birthdateDay}`;
    }

    const currentDate = new Date();

    const parsedNextBirthDate = new Date(nextBirthDate);
    const differencesInMilliseconds = parsedNextBirthDate.getTime() - currentDate.getTime();
    const daysRemaining = parseInt(`${differencesInMilliseconds / (1000 * 60 * 60 * 24)}`);

    let hoursRemaining = 23 - currentDate.getHours();
    let minutesRemaining = 59 - currentDate.getMinutes();
    const secondsRemaining = 59 - currentDate.getSeconds();

    if (secondsRemaining < 0) {
      minutesRemaining -= 1;
    }
    if (minutesRemaining < 0) {
      hoursRemaining -= 1;
    }
    setRemainingDays(daysRemaining);
    setRemainingHours(hoursRemaining);
    setRemainingMinutes(minutesRemaining);
    setRemainingSeconds(secondsRemaining);
  }, [birthdate]);

  useEffect(() => {
    const intervalFrequency = 1000;

    const intervalId = setInterval(() => {
      calculateNumbers();
    }, intervalFrequency);

    return () => {
      clearInterval(intervalId);
    };
  }, [calculateNumbers]);

  return (
    <div>
      <SettingsIconContainer>
        <SettingsIcon src={gearLogo} alt="Settings" onClick={showSettings} />
      </SettingsIconContainer>

      <TimeBeforeBirthdayTitle>
        Birthday Countdown
      </TimeBeforeBirthdayTitle>

      <BirthdayDate>
        (before {birthdayFormatted})
      </BirthdayDate>

      <CountdownContainer>
        <CountdownNumber>{remainingDays}</CountdownNumber>
        <CountdownNumber>{remainingHours}</CountdownNumber>
        <CountdownNumber>{remainingMinutes}</CountdownNumber>
        <CountdownNumber>{remainingSeconds}</CountdownNumber>

        <CountdownColumnName>Days</CountdownColumnName>
        <CountdownColumnName>Hours</CountdownColumnName>
        <CountdownColumnName>Minutes</CountdownColumnName>
        <CountdownColumnName>Seconds</CountdownColumnName>
      </CountdownContainer>
    </div>


  );
};

export default CountDown;
