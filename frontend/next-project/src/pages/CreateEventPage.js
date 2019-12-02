/* Import package components */
import React, { useState } from "react";
import axios from "axios";
import DateFnsUtils from "@date-io/date-fns";
import { Button } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { route, getApiRoute } from "../global";
import useStores from "../hooks/useStores";
import { observer } from "mobx-react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
/* Import app components */
import DialogPage from "../components/DialogPage";

function CreateEventPage({ parentRouteTo, parentRouteArgs }) {
  const {
    userStore: { currentUser, getToken }
  } = useStores();
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

  const handleCreate = () => {
    const lesson = parentRouteArgs;
    console.log("date: " + selectedDate);
    axios
      .post(
        `${getApiRoute("events/create")}`,
        {
          lesson_id: lesson.id,
          user_id: currentUser.id,
          start_datetime: "2019-11-30 14:13:03.603560"
        },
        getToken()
      )
      .then(result => {
        // console.log(result);
        console.log("create event successfully");
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
    parentRouteTo(route.close);
  };

  /* CSS Styles */
  const ContainerStyles = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    width: "100%"
  };

  /* Date Picker */
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = date => {
    setSelectedDate(date);
  };
  const theme = createMuiTheme({
    palette: {
      secondary: { main: "#1589FF" }
    }
  });
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} color="secondary">
          <div style={ContainerStyles}>
            <div style={{ marginTop: "150px" }} color="secondary">
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Select Date"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
                color="secondary"
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Select Time"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change time"
                }}
                color="secondary"
              />
            </div>

            <br />
            <Button
              onClick={() => handleCreate()}
              style={{
                backgroundColor: "#1589FF",
                color: "#FFFFFF",
                fontSize: "16px",
                borderRadius: 16,
                fontWeight: "bold",
                height: "45px",
                width: 360,
                marginTop: "5px"
              }}
            >
              Submit
            </Button>
          </div>
        </MuiPickersUtilsProvider>
        <DialogPage
          routeTo={routeTo}
          routeOption={routeOption}
          routeArgs={routeArgs}
          dialogOpen={dialogOpen}
        />
      </MuiThemeProvider>
    </>
  );
}

export default observer(CreateEventPage);
