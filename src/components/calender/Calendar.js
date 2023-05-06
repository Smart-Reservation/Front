import Day from "./days";
import { useEffect, useRef, useState } from "react";
import "./calender.css";
// import Head from './header';

function Calender(SelectDate) {
  let now = new Date();
  let month = now.getMonth();
  let year = now.getFullYear();
  const monthCount = useRef(month);
  const [monthCurrent, setMonth] = useState(month);
  const [data, setData] = useState();

  const onClick = (d) => {
    setData(d);
  };
  const onClickNo = () => {};

  function monthAfter() {
    setMonth(monthCount.current + 1);
    monthCount.current++;
  }
  function monthBefore() {
    setMonth(monthCount.current - 1);
    monthCount.current--;
  }

  function fullYearAdder(startDate) {
    const fullYear = [];
    const monthForYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let sevenDays = [];

    for (let i = 0; i < startDate; i++) {
      sevenDays.push("");
    }
    for (let j = 0; j <= monthForYear.length; j++)
      for (let i = 1; i <= monthForYear[j]; i++) {
        sevenDays.push(
          <Day
            date={i}
            month={j + 1}
            key={i}
            monthCompare={monthCount.current}
            onClick={onClick}
          />
        );
        if (sevenDays.length === 7) {
          fullYear.push(sevenDays);
          sevenDays = [];
        }
      }
    return fullYear;
  }

  function DaySpliter({ month }) {
    const a = fullYearAdder();
    const b = [];

    for (let i = 0; i < a.length; i++) {
      if (a[i][0].props.month === month ||a[i][a[i].length - 1].props.month === month) {
        // if (((a[i][0].props.month === month) !== a[i][a[i].length - 1].props.month) ===month) { }
        b.push(<div className="oneWeek">{a[i]}</div>);
      }
    }
    return <div>{b}</div>;
  }

  function DayOfTheWeek() {
    const daylist = ["일", "월", "화", "수", "목", "금", "토"];

    return (
      <div className="oneWeek">
        {daylist.map((value) => (
          <Day date={value} onClick={onClickNo} />
        ))}
      </div>
    );
  }

  return (
    <>
      {/* <Head /> */}
      <div className="calender">
        <div>
          <button onClick={monthBefore}>&lt;</button>
          <span>
            {year}년{monthCurrent}월
          </span>{" "}
          <button onClick={monthAfter}>&gt;</button>
        </div>
        <DayOfTheWeek />
        <DaySpliter month={monthCount.current} />
      </div>
    </>
  );
}

export default Calender;
