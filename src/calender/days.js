import classes from './days.module.css'


function Day({date,month, monthCompare}){
    const allDay={date,month}
    return(
        <div id='blurred' className={classes.eachDay}>
            {monthCompare===month ? allDay.date:(null)}
        </div>
    )
}
export default Day;