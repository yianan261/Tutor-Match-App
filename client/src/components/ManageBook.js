import React, { useEffect, useState } from "react";
import "../assets/styles/ManageBook.css";
import { useAuth } from "../utils/auth";
import TutorModal from "./TutorModal";

/**Yian Chen
 * component that renders booking schedule of student
 * @returns JSX of manage booking UI
 */
function ManageBook() {
  const auth = useAuth();
  const [schedule, setSchedule] = useState([]);
  const [remove, setRemove] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [tutorInfo, setTutorInfo] = useState(null);
  // const navigate = useNavigate();

  //function that closes modal when triggered
  const handleModal = () => {
    setModalOpen(false);
  };

  /**Yian
   * this function gets the schedule of the user and makes a copy to schedule
   */
  useEffect(() => {
    try {
      const fetchSchedule = async () => {
        const res = await fetch("/api/getSchedule");
        const resSchedule = await res.json();
        const sched = resSchedule.data.schedule;
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

  /**
   * Yian Chen
   * function that removes class from database
   * @param {String} date
   * @param {String} time
   * @param {String} tutor
   */
  const removeClass = async (date, time, tutor) => {
    try {
      let scheduleObj = {};
      scheduleObj.user = auth.user;
      scheduleObj.date = date;
      scheduleObj.time = time;
      scheduleObj.tutor = tutor;

      const res = await fetch("/deleteClass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(scheduleObj),
      });
      const resMsg = await res.json();
      setRemove(true);
      alert(resMsg.msg);
    } catch (err) {
      console.error(err);
      alert(`There was an error, please contact customer support`);
    }
  };

  /**Yian Chen
   * function that renders delete button
   * @param {String} date
   * @param {String} time
   * @param {String} tutor
   * @returns
   */
  const renderDeleteBtn = (date, time, tutor) => {
    return (
      <button
        className="deleteBtnBook"
        onClick={() => {
          const confirmBox = window.confirm("Are you sure you want to cancel?");
          if (confirmBox === true) {
            removeClass(date, time, tutor);
          }
        }}
      >
        cancel class
      </button>
    );
  };

  /**
   * Yian Chen
   * function that gets TutorInfo when clicked
   * @param {int} tutor_id
   */
  const getTutorInfo = async (tutor_id) => {
    try {
      const res = await fetch(`/book/tutors/${tutor_id}`);
      const tutor = await res.json();
      setTutorInfo(tutor.data);
      setModalOpen(true);
    } catch (err) {
      console.error(`there was an error ${err}`);
    }
  };

  /**
   * function that renders class button
   * @param {int} tutor_id
   * @returns button UI
   */
  const renderClassInfoBtn = (tutor_id) => {
    return (
      <button
        className="checkClassBtn"
        onClick={(evt) => {
          evt.preventDefault();
          getTutorInfo(tutor_id);
        }}
      >
        details
      </button>
    );
  };

  return (
    <div className="mainDivBook" role="main">
      <div className="innerDivBook">
        <h1 className="titleBook">My Schedule</h1>
        {schedule.map((i, idx) => {
          return (
            <div className="line1" key={`${i.date}_${idx}`}>
              <div className="scheduleDivBook">
                <p className="datep">
                  <strong>Date :</strong> {i.date}
                </p>
                <p className="timep">
                  <strong>Time :</strong> {i.time}
                </p>
                <p className="tutorp">
                  <strong>Tutor :</strong> {i.tutor}
                </p>
                <p className="subjectp">
                  <strong>Subject :</strong> {i.subject}
                </p>
                <span className="detailBtnSpanBook">
                  {renderClassInfoBtn(i.tutor_ID)}
                </span>
                <span className="deleteBtnSpanBook">
                  {renderDeleteBtn(i.date, i.time, i.tutor)}
                </span>
              </div>
            </div>
          );
        })}
        <div className="tutorModal">
          {modalOpen ? (
            <TutorModal handleModal={handleModal} tutorInfo={tutorInfo} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

ManageBook.propTypes = {};
export default ManageBook;
