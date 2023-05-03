import classes from './days.module.css'


function Day({date,month, monthCompare,isactive, hey, setData}){


    const dataExample={
        link : "www.naver.com",
        date, 
        avalableTime:[12,13,14,15,16],
    }
    function dataCall(){
        setData([dataExample.link , date, dataExample.avalableTime])
    }    
    return(
        <div id={`${date}`} onClick={dataCall} style={{
            backgroundColor: isactive ? 'blue' : ''
        }}
         className={classes.eachDay}>
            {monthCompare===month ? date:(null)}
        </div>
    )
}
export default Day;