/* Import package components */
import React, { useState, useEffect } from "react";
import { route, getApiRoute } from "../global";
import axios from "axios";

/* Import app components */
import DialogPage from "../components/DialogPage";
import SearchBar from "../components/SearchBar";
import ListCard from "../pages/ListCard";

export default function BookmarkListPage() {
  const [routeArgs, setRouteArgs] = useState([]);
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
    const token = localStorage.getItem("userToken");
    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };

    axios
      .get(`${getApiRoute("bookmarks/")}`, config)
      .then(result => {
        setLessonsData({
          datas: result.data.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div style={{ width: "100vw" }}>
        <SearchBar />
      </div>
      <div
        style={{ marginTop: "10px" }}
        id="cardBox"
        onClick={() => routeTo(route.lessonPage)}
      >
        {lessonsData.datas.map((lessonData, index) => (
          <div
            key={index}
            onClick={() => {
              setRouteArgs({ lesson: lessonData, showAction: true });
              routeTo(route.lessonPage);
            }}
          >
            <ListCard lesson={lessonData} />
          </div>
        ))}
      </div>
      <DialogPage
        routeTo={routeTo}
        routeOption={routeOption}
        routeArgs={routeArgs}
        dialogOpen={dialogOpen}
      />
    </div>
  );
}
