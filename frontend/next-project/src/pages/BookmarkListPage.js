/* Import package components */
import React, { useState } from "react";
import { route } from "../global";

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
        <ListCard />
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
