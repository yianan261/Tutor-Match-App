import React, { useEffect, useState } from "react";
import "../assets/styles/ManageBook.css";
import { useAuth } from "../utils/auth";

/**
 * component that renders booking schedule of student
 * @returns
 */
function ManageBook() {
  const auth = useAuth();
  const [schedule, setSchedule] = useState([]);
  const [remove, setRemove] = useState(false);

  console.log("currUser", auth.user);
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
        setSchedule([...sched]);
      };
      //only fetch schedule if user is logged in
      if (auth.user) {
        fetchSchedule();
      }
    } catch (err) {
      console.error(err);
    }
  }, [remove]);

  const removeClass = async (date, time, tutor) => {
    try {
      let scheduleObj = {};
      scheduleObj.user = auth.user;
      scheduleObj.date = date;
      scheduleObj.time = time;
      scheduleObj.tutor = tutor;
      console.log("SCHEDULEOBJ", scheduleObj);

      const res = await fetch("/deleteClass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(scheduleObj),
      });
      const resMsg = await res.json();
      console.log("resMsg", resMsg.msg);
      setRemove(true);
      alert(resMsg.msg);
    } catch (err) {
      console.error(err);
      alert(`There was an error, please contact customer support`);
    }
  };
  const renderDeleteBtn = (date, time, tutor) => {
    return (
      <button
        className="deleteBtn"
        onClick={() => removeClass(date, time, tutor)}
      >
        cancel class
      </button>
    );
  };
  return (
    <div className="mainDiv">
      <div className="innerDiv">
        <h2 className="title">My Schedule</h2>
        {schedule.map((i, idx) => {
          return (
            <div className="line1" key={`${i.date}_${idx}`}>
              <div className="scheduleDiv">
                <p className="datep">
                  <strong>Date :</strong> {i.date}
                </p>
                <p className="timep">
                  <strong>Time :</strong> {i.time}
                </p>
                <p className="tutorp">
                  <strong>Tutor :</strong> {i.tutor}
                </p>
                <span className="deleteBtnSpan">
                  {renderDeleteBtn(i.date, i.time, i.tutor)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ManageBook;
