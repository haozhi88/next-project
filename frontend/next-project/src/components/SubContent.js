/* Import package components */
import React from "react";
import { route } from "../global";

/* Import app components */
import InboxListPage from "../pages/InboxListPage";
import EventListPage from "../pages/EventListPage";
import LessonListPage from "../pages/LessonListPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import ProfilePage from "../pages/ProfilePage";
import LessonPage from "../pages/LessonPage";
import BookmarksPage from "../pages/BookmarksPage";
import CreateEventPage from "../pages/CreateEventPage";
import CreateLessonPage from "../pages/CreateLessonPage";
import RatingPage from "../pages/RatingPage";
import EventPage from "../pages/EventPage";
import VersionPage from "../pages/VersionPage";

/* CSS Styles */
const ContainerStyles = {
  height: "calc(100vh - 56px)",
  width: "100vw",
  overflow: "auto",
  textAlign: "center"
};

export default function SubContent({ routeTo, routeOption, routeArgs }) {
  function renderView() {
    switch (routeOption) {
      case route.close:
        return <p>todo: close</p>;
      case route.inboxListPage:
        return (
          <InboxListPage parentRouteTo={routeTo} parentRouteArgs={routeArgs} />
        );
      case route.eventListPage:
        return (
          <EventListPage parentRouteTo={routeTo} parentRouteArgs={routeArgs} />
        );
      case route.teachListPage:
        return (
          <LessonListPage
            parentRouteTo={routeTo}
            parentRouteArgs={routeArgs}
            teach={true}
          />
        );
      case route.learnListPage:
        return (
          <LessonListPage
            parentRouteTo={routeTo}
            parentRouteArgs={routeArgs}
            teach={false}
          />
        );
      case route.bookmarkListPage:
        return (
          <BookmarksPage parentRouteTo={routeTo} parentRouteArgs={routeArgs} />
        );
      case route.signinPage:
        return (
          <SignInPage parentRouteTo={routeTo} parentRouteArgs={routeArgs} />
        );
      case route.signupPage:
        return (
          <SignUpPage parentRouteTo={routeTo} parentRouteArgs={routeArgs} />
        );
      case route.profilePage:
        return (
          <ProfilePage parentRouteTo={routeTo} parentRouteArgs={routeArgs} />
        );
      case route.lessonPage:
        return (
          <LessonPage parentRouteTo={routeTo} parentRouteArgs={routeArgs} />
        );
      case route.createLearnPage:
        return (
          <CreateLessonPage
            parentRouteTo={routeTo}
            parentRouteArgs={routeArgs}
            teach={false}
          />
        );
      case route.createTeachPage:
        return (
          <CreateLessonPage
            parentRouteTo={routeTo}
            parentRouteArgs={routeArgs}
            teach={true}
          />
        );
      case route.createEventPage:
        return (
          <CreateEventPage
            parentRouteTo={routeTo}
            parentRouteArgs={routeArgs}
          />
        );
      case route.ratingPage:
        return (
          <RatingPage parentRouteTo={routeTo} parentRouteArgs={routeArgs} />
        );
      case route.eventPage:
        return (
          <EventPage parentRouteTo={routeTo} parentRouteArgs={routeArgs} />
        );
      case route.versionPage:
        return (
          <VersionPage parentRouteTo={routeTo} parentRouteArgs={routeArgs} />
        );
      case route.todo:
        return <p>todo: please complete this component/page</p>;
      default:
        return new Error("This view does not exist");
    }
  }

  return (
    <>
      <div style={ContainerStyles}>{renderView()}</div>
    </>
  );
}
