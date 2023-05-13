import Day from "./days";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useReservationInfoDispatch } from "../../context/ReservationInfoContext";
// import Head from './header';

const CalendarContainer = styled.div`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 3em;
  text-align: center;
  margin-top: 20px;
  display: inline-flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  border: 1px solid rgb(253, 234, 234);
  border-radius: 5%;
  padding: 3vw;
`;

const CalendarHeader = styled.div`
  display: flex;
  -webkit-box-pack: center;
  justify-content: space-between;
`;

const WeekContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const MonthButton = styled.button`
  font-size: 1.5em;
  border: 0px;
  background-color: white;
  color: black;
  cursor: pointer;
`;
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//현재보다 이전이면 true
function dateLTnow(date, now) {
  if (date <= now) {
    return date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth()
      ? date.getDate() < now.getDate()
      : true;
  }
  return false;
}

function getDates(startDate, endDate) {
  const dates = [];
  for (let i = 0; i < startDate.getDay(); i++) dates.push("");

  for (
    let date = startDate;
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    dates.push(new Date(date));
  }
  while (dates.length % 7 !== 0) {
    dates.push("");
  }

  return dates;
}

function Calender({SelectDate}) {
  let now = new Date();
  const [year, setyear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [fullMonth, setFullMonth] = useState([]);
  const [selectedDate, setSelectedDate] = useState(now);
  const reservationDispatch=useReservationInfoDispatch();
  // const [data, setData] = useState();

  const handleDayClick = (date) => {
    setSelectedDate(()=>date);
    let dateStamp={
      year:date.getFullYear(),
      month:date.getMonth()+1,
      day:date.getDate()
    }
    SelectDate(dateStamp);
  };

  useEffect(()=>{
    reservationDispatch({type:"SELECT_DATE",date:{
      year:now.getFullYear(),
      month:now.getMonth()+1,
      day:now.getDate()
    }})
  },[])

  const handleEmptyClick = () => {
    console.log("");
  };

  function nextMonth() {
    setyear(year + parseInt(month / 12));
    setMonth((month % 12) + 1);
    setSelectedDate();
  }

  function previousMonth() {
    setMonth(((month + 10) % 12) + 1);
    setyear(year - parseInt((((month + 10) % 12) + 1) / 12));
    setSelectedDate();
  }

  useEffect(() => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const dates = getDates(startDate, endDate);
    const weeks = [[]];

    dates.forEach((date) => {
      if (weeks.length === 0 || weeks[weeks.length - 1].length === 7) {
        weeks.push([]);
      }
      weeks[weeks.length - 1].push(date);
    });

    const mon = weeks.map((week, index) => (
      <WeekContainer key={index + "week"}>
        {week.map((date, idx) => (
          <Day
            date={date}
            onClickEmpty={handleEmptyClick}
            onClickDay={() => handleDayClick(date)}
            key={typeof date === "string" ? index + date + idx : date.getDate()}
            isDate={typeof date !== "string"}
            selectedDate={selectedDate}
            disable={typeof date !== "string" ? dateLTnow(date, now) : false}
          />
        ))}
      </WeekContainer>
    ));

    setFullMonth(mon);
  }, [year, month, selectedDate]);

  return (
    <>
      {/* <Header /> */}
      <CalendarContainer>
        <CalendarHeader>
          <MonthButton onClick={previousMonth}>&lt;</MonthButton>
          <span>
            {year}년{month}월
          </span>
          <MonthButton onClick={nextMonth}>&gt;</MonthButton>
        </CalendarHeader>
        <WeekContainer>
          {WEEKDAYS.map((value) => (
            <Day key={value} date={value} onClick={handleEmptyClick} />
          ))}
        </WeekContainer>
        {fullMonth}
      </CalendarContainer>
    </>
  );
}

export default Calender;
