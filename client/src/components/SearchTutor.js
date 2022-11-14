import React, { useEffect, useState } from "react";
import "../assets/styles/SearchTutor.css";
import { useParams } from "react-router-dom";
import TutorProfile from "../components/TutorProfile";
// import TutorInfo from "../components/TutorInfo";

function SearchTutor() {
  const [searchword, setSearchword] = useState("");
  const { keyword } = useParams();
  const [user, setUser] = useState([]);
  useEffect(() => {
    try {
      const getData = async () => {
        const res = await fetch("http://localhost:5001/book", {
          method: "GET",
        });
        const resUser = await res.json();
        setUser(resUser.userList);
      };
      getData();
    } catch (err) {
      console.error("error");
    }
  }, []);

  return (
    <div>
      SearchTutor
      <div className="wrap">
        <div className="search">
          <input
            type="text"
            className="searchTerm"
            value={searchword}
            onChange={(evt) => setSearchword(evt.target.value)}
            placeholder="What are you looking for?"
          />
          <button type="submit" value="Submit" className="searchButton">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
      <TutorProfile keyword={keyword} />
      <h3>TEST USERS: {user}</h3>
    </div>
  );
}

export default SearchTutor;
