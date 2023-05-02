import Day from "./days";
import {useEffect, useRef, useState} from 'react';
import './calender.css';

function Calender(){
    let now=new Date();
    let month=now.getMonth();
    let year= now.getFullYear();
    const monthCount=useRef(month);
    const [monthCurrent,setMonth]= useState(month);

    function monthAfter(){

        setMonth(monthCount.current+1);
        monthCount.current++;

    }
    function monthBefore(){
        console.log(12)
        setMonth(monthCount.current-1);
        monthCount.current--;

    }
    useEffect(()=>{
    },[])
    function fullYearAdder (startDate){
        const fullYear=[];
        const monthForYear=[31,28,31,30,31,30,31,31,30,31,30,31];
        let sevenDays=[];
        console.log('반복 확인')
        for(let i=0; i<startDate; i++){
            sevenDays.push('');}
            for(let j=0; j<=monthForYear.length; j++)
                for(let i=1; i<=monthForYear[j]; i++){
                    sevenDays.push(<Day date={i} month={j+1} key={i} monthCompare={monthCount.current}/>);
                    if(sevenDays.length==7){
                        fullYear.push(sevenDays);
                        sevenDays=[];
                }}
                    return fullYear;
                }

    function DaySpliter({month}){
        const a= fullYearAdder();
        const b=[];
        console.log(a)
        
        for(let i=0; i<a.length; i++){
            console.log(a[i][0].props.month==month)
            if(a[i][0].props.month==month  || a[i][a[i].length-1].props.month==month ){
                if(a[i][0].props.month==month  != a[i][a[i].length-1].props.month==month ){
                    
                }
                b.push(<div className="oneWeek">{a[i]}</div>);
        }
    }           
            return (<>
                {b}
            </>)
    }



    function DayOfTheWeek(){
        console.log(1)
        const arrayFor=[];

        arrayFor.push(<div className="oneWeek  ">
            <Day date="일"/><Day date="월"/>
            <Day date="화"/><Day date="수"/><Day date="목"/>
            < Day date="금"/><Day date="토"/></div>);

        return arrayFor;
    
    }

   
    
    return(
        <div className="calender"> 
            <div><button onClick={monthBefore}>&lt;</button>{year}년{monthCurrent}월 <button onClick={monthAfter}>&gt;</button></div>
            <DayOfTheWeek/>
            <DaySpliter  month={monthCount.current}/>
        </div>

    )


}

    export default Calender;

