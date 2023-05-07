import Day from "./days";
import { useEffect, useRef, useState } from "react";
import "./calender.css";
// import Head from './header';

function Calender() {
    let now = new Date();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    const [monthCurrent, setMonth] = useState(month);
    const [yearCurrent, setyear] = useState(year);
    const monthCount = useRef(month);
    const yearCount = useRef(year);
    const [data, setData] = useState();

    const onClick = (d) => {
        setData(d);
        console.log(data);
    }
    const onClickNo = () => {
        console.log('')
    }

    function monthAfter() {
        if (monthCount.current === 12) {
            monthCount.current = 0;
            yearCount.current++;
            setyear(yearCount.current)
            console.log(startDayCal.yearFirstDay);
        }
        monthCount.current++;
        setMonth(monthCount.current);
    }

    function monthBefore() {
        if (monthCount.current === 1) {
            monthCount.current = 13;
            yearCount.current--;
            setyear(yearCount.current);

        }
        monthCount.current--;

        setMonth(monthCount.current);

        // 2016:5,
        // 2017:0,
        // 2018:1,
        // 2019:2,
        // 2020:3,
        // 2021:5,
        // 2022:6,
        // 2023:0,
        // 2024:
    }
    const yearFirstDay = {};
    const startDayCal = () => {
        let day = 6;
        for (let year = 2000; year <= 2100; year++) {
            yearFirstDay[year] = day;
            day++;
            if (year % 4 === 0) day += 1;
            if (day === 7) day = 0;
            if (day === 8) day = 1;
        }
        console.log(yearFirstDay)
    }
    startDayCal();


    function fullYearAdder(startDate) {
        const fullYear = [];
        const monthForYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let sevenDays = [];
        for (let i = 0; i < startDate; i++) {
            sevenDays.push(<Day date={''} month={0} key={i} monthCompare={monthCount.current} onClick={onClickNo} />);
        }
        for (let j = 0; j <= monthForYear.length; j++)
            for (let i = 1; i <= monthForYear[j]; i++) {
                sevenDays.push(<Day date={i} month={j + 1} key={i} monthCompare={monthCount.current} onClick={onClick} />);
                if (sevenDays.length == 7) {
                    fullYear.push(sevenDays);
                    sevenDays = [];
                }
            }
        return fullYear;
    }

    function DaySpliter({ month }) {
        const a = fullYearAdder(yearFirstDay[yearCurrent]);
        const b = [];

        for (let i = 0; i < a.length; i++) {
            if (a[i][0].props.month === month || a[i][a[i].length - 1].props.month === month) {
                b.push(<div className="oneWeek">{a[i]}</div>);
            }
        }
        return <div>{b}</div>;
    }

    function DayOfTheWeek() {
        const daylist = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        return <div className="oneWeek">
            {daylist.map((value) =>
                <Day date={value} onClick={onClickNo} />
            )}
        </div>
    }


    return (
        <>
            {/* <Header /> */}
            <div className="calender" >
                <div ><button onClick={monthBefore}>&lt;</button><span>{yearCurrent}년{monthCurrent}월</span> <button onClick={monthAfter}>&gt;</button></div>
                <DayOfTheWeek />
                <DaySpliter month={monthCurrent} />
            </div>
        </>
    );
}

export default Calender;
