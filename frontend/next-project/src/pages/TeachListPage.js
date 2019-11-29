/* Import package components */
import React, { useState } from "react";
import { route } from "../global";

/* Import app components */
import DialogPage from "../components/DialogPage";
import SearchBar from "../components/SearchBar";
import ListCard from "../components/ListCard";

export default function TeachListPage(props) {
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
        dialogOpen={dialogOpen}
      />
    </div>
  );
}
