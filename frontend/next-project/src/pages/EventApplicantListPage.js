/* Import package components */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { route, getApiRoute } from "../global";
import useStores from "../hooks/useStores";

/* Import app components */
import DialogPage from "../components/DialogPage";
import EventApplicantCard from "./EventApplicantCard";
import LoadingNav from "../components/LoadingNav";

export default function EventApplicantListPage({ parentRouteTo }) {
  const [routeArgs, setRouteArgs] = useState([]);
  const [routeOption, setRouteOption] = useState(route.close);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [eventList, setEventList] = useState([]);
  const {
    userStore: { getToken, currentUser }
  } = useStores();
  const routeTo = option => {
    if (option === route.close) {
      setDialogOpen(false);
    } else {
      setDialogOpen(true);
    }
    setRouteOption(option);
  };
  const handleLinkLesson = lesson_id => {
    axios
      .get(`${getApiRoute("lessons/")}${lesson_id}`)
      .then(result => {
        const lessonData = result.data;
        // console.log(lesson);
        setRouteArgs({ lesson: lessonData, showAction: false });
        routeTo(route.lessonPage);
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
  };
  const handleAction = (event_id, action) => {
    console.log(action);
    axios
      .post(
        `${getApiRoute("events/")}${event_id}/status`,
        { status: action },
        getToken()
      )
      .then(result => {
        // console.log(result);
        console.log("update event status to complete successfully");
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
    parentRouteTo(route.close);
  };
  const handleRating = event_id => {
    setRouteArgs({ event_id: event_id });
    routeTo(route.ratingPage);
  };

  useEffect(() => {
    axios
      .get(
        `${getApiRoute("events/my")}`,
        {
          params: {
            status: ["pending", "approved", "complete"],
            user_name: currentUser.name
          }
        },
        getToken()
      )
      .then(result => {
        const eventlist = result.data.data.applicant;
        setEventList(eventlist);
        setIsLoading(false);
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
  }, []);

  if (isLoading) {
    return <LoadingNav />;
  }
  return (
    <>
      {/* <div style={{ display: "flex", justifyContent: "center" }}> */}
      <div
        style={{
          marginTop: "10px",
          display: "grid",
          justifyContent: "center",
          gridGap: "10px"
        }}
        id="cardBox"
      >
        {eventList.map((event, index) => (
          <EventApplicantCard
            key={index}
            event={event}
            handleLinkLesson={handleLinkLesson}
            handleAction={handleAction}
            handleRating={handleRating}
          />
        ))}
        <DialogPage
          routeTo={routeTo}
          routeOption={routeOption}
          routeArgs={routeArgs}
          dialogOpen={dialogOpen}
        />
      </div>
    </>
  );
}
