/* Import package components */
import React, { useState, useEffect } from "react";
import { route } from "../global";
import axios from "axios";
/* Import app components */
import DialogPage from "../components/DialogPage";
import SearchBar from "../components/SearchBar";
import ListCard from "../components/ListCard";
import { getApiRoute } from "../global";

export default function LessonListPage({props, teach}) {
  const [routeOption, setRouteOption] = useState(route.close);
  const [dialogOpen, setDialogOpen] = useState(false);
  const routeTo = option => {
    if (option === route.close) {
      setDialogOpen(false);
    } else {
      setDialogOpen(true);
    }
    setRouteOption(option);
  };

  const [lessonsData, setLessonsData] = useState({
    datas: []
  });

  useEffect(() => {
    axios
      .get(`${getApiRoute("lessons/")}`, {teach:teach})
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
      <div style={{ marginTop: "10px", display: "grid", justifyContent: "center" }} id="cardBox">
        {lessonsData.datas.map(lesson => 
          <ListCard lesson={lesson} key={lesson.id}/>
        )}
      </div>
      <DialogPage
        routeTo={routeTo}
        routeOption={routeOption}
        dialogOpen={dialogOpen}
      />
    </div>
  );
}
