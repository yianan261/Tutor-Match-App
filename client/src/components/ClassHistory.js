import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/auth";
import "../assets/styles/ClassHistory.css";
import ReviewModal from "./ReviewModal";

/**Yian Chen
 * component that renders user class history
 * @returns Class History JSX
 */
function ClassHistory() {
  const auth = useAuth();
  const [history, setHistory] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currTutor, setCurrTutor] = useState({ tutor: "", tutor_lastname: "" });

  //This function gets the user in session
  useEffect(() => {
    const getCurrentUser = async () => {
      await fetch("/getUser")
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((data) => {
          console.log("get current user", data);
          if (data.user === null) {
            console.log("no user");
          }
        });
    };

    getCurrentUser();
  }, [auth]);

  /**Yian
   * this function gets the history of the user
   */
  useEffect(() => {
    try {
      const fetchSchedule = async () => {
        const res = await fetch("/api/getSchedule");
        const resHistory = await res.json();
        console.log("resHistory", resHistory);
        const userHistory = resHistory.data.history;
        console.log("userHistory", userHistory);
        setHistory([...userHistory]);
      };
      //only fetch schedule if user is logged in
      if (auth.user) {
        fetchSchedule();
      }
    } catch (err) {
      console.error(err);
    }
  }, [auth]);

  /**Yian Chen
   * function that renders comment button
   * @returns opens review modal when clicked
   */
  const renderCommentBtn = (i) => {
    console.log("i", i);
    return (
      <button
        className="commentBtnHistory"
        onClick={(evt) => {
          evt.preventDefault();
          setModalOpen(true);
          setCurrTutor(i);
        }}
      >
        add review
      </button>
    );
  };

  //function that closes modal when triggered
  const handleModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="mainDivHistory">
      <div className="innerDivHistory">
        <h2 className="titleHistory">My Class History</h2>
        {history.map((i, idx) => {
          return (
            <div className="line1" key={`${i.date}_${idx}`}>
              <div className="scheduleDivHistory">
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
                <span className="commentBtnSpanHistory">
                  {renderCommentBtn(i)}
                </span>
              </div>
            </div>
          );
        })}
        <div className="reviewModalDiv">
          {modalOpen ? (
            <ReviewModal handleModal={handleModal} currTutor={currTutor} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ClassHistory;
