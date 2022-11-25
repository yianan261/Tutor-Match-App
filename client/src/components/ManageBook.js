import React,{useEffect,useState} from "react";
import "../assets/styles/ManageBook.css";
import { useAuth } from "../utils/auth";

/**
 * component that renders booking schedule of student
 * @returns 
 */
function ManageBook() {
const auth = useAuth();
const [schedule,setSchedule] = useState([])

console.log("currUser",auth.user)
 /**Yian
   * this function gets the schedule of the user and maps to bookClassMap
   */
  useEffect(() => {
    try {
      const fetchSchedule = async () => {
        const res = await fetch("/api/getSchedule");
        const resSchedule = await res.json();
        console.log("resSchedule", resSchedule);
        const sched = resSchedule.data.schedule;
        console.log("SCHED", sched);
        setSchedule([...sched])
      };
      //only fetch schedule if user is logged in
      if (auth.user) {
        fetchSchedule();
      }
    } catch (err) {
      console.error(err);
    }
  }, []);


  return (
    <div className="mainDiv">
      <div className="innerDiv">
        <h2 className="title">My Schedule</h2>
       {schedule.map((i,idx)=>{
        return(
            <div className="line1" key={`${i.date}_${idx}`}>
            <div className="scheduleDiv">
                <p className="datep"><strong>Date :</strong> {i.date}</p>
                <p className="timep"><strong>Time :</strong> {i.time}</p>
                <p className="tutorp"><strong>Tutor :</strong> {i.tutor}</p>
                </div>
            </div>
        )
       })}
      </div>
    </div>
  );
}

export default ManageBook;
