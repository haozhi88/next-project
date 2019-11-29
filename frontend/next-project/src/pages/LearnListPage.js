/* Import package components */
import React, { useState, useEffect } from "react";
import { route } from "../global";

/* Import app components */
import DialogPage from "../components/DialogPage";
import SearchBar from "../components/SearchBar";
import ListCard from "../components/ListCard";

export default function LearnListPage(props) {
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

  const [lessonsList, setLessonsList] = useState(null)
  useEffect(() => {
    axios.get(`${getApiRoute("/lessons")}`).then(response => {
      console.log(response)
      setLessonsList(response)
      // check what is response. Response should be all lesson data. Use the data to show the relevant info on lessonpage and lessoncard 
    })
  },[])


  return (
    <div>
      <div style={{ width: "100vw" }}>
        <SearchBar />
      </div>
      <div
      style={{ marginTop: "10px"}}
        id="cardBox"
        onClick={() => routeTo(route.lessonPage)}
      >
        <ListCard />
      </div>
      <DialogPage
        routeTo={routeTo}
        routeOption={routeOption}
        dialogOpen={dialogOpen}
        args={args}
      />
    </div>
  );
}
