import classes from './days.module.css'


function Day({date,month, monthCompare,isactive, data, onClick}){

    
    const dataExample={
        link : "www.naver.com",
        date, 
        avalableTime:[12,13,14,15,16],
    }
    

    return(
        <div id={`${date}`} onClick={()=>onClick(dataExample)} style={{
            backgroundColor: isactive ? 'blue' : ''
        }}
         className={classes.eachDay}>
            {monthCompare===month ? date:(null)}
        </div>
    )
}
export default Day;