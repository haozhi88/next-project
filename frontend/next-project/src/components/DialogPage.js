/* Import package components */
import React from "react";
import { Dialog, Slide } from "@material-ui/core";

/* Import app components */
import SubTopNav from "../components/SubTopNav";
import SubContent from "../components/SubContent";

const SlideTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogPage({ routeTo, routeOption, dialogOpen }) {
  return (
    <>
      <Dialog
        open={dialogOpen}
        fullScreen
        TransitionComponent={SlideTransition}
      >
        <SubTopNav routeTo={routeTo} routeOption={routeOption} />
        <SubContent routeTo={routeTo} routeOption={routeOption} />
      </Dialog>
    </>
  );
}
