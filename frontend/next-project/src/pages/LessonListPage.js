/* Import package components */
import React, { useState, useEffect } from "react";
import axios from "axios";
/* Import app components */
import SearchBar from "../components/SearchBar";
import ListCard from "../components/ListCard";
import { getApiRoute } from "../global";

export default function LessonListPage({ teach }) {
  const [lessonsData, setLessonsData] = useState({
    datas: []
  });

  useEffect(() => {
    axios
      .get(`${getApiRoute("lessons/filter?")}teach=${teach}`)
      .then(result => {
        console.log(result.data);
        setLessonsData({
          datas: result.data
        });
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
  }, []);

  return (
    <div>
      <div style={{ width: "100vw" }}>
        <SearchBar />
      </div>
      <div
        style={{ marginTop: "10px", display: "grid", justifyContent: "center" }}
        id="cardBox"
      >
        {lessonsData.datas.map(lesson => (
          <ListCard lesson={lesson} key={lesson.id} />
        ))}
      </div>
    </div>
  );
}
