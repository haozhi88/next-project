/* Import package components */
import React, { useState } from "react";
import axios from "axios";
import DateFnsUtils from "@date-io/date-fns";
import { Button, ButtonGroup } from "@material-ui/core";
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
        console.log(result);
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
          <div style={{ position: "relative", top: "150px" }} color="secondary">
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
          <div style={ContainerStyles}>
            <ButtonGroup
              fullWidth
              aria-label="full width button group"
              style={{
                position: "absolute",
                bottom: 0,
                height: "7vh"
              }}
            >
              <Button
                onClick={() => parentRouteTo(route.close)}
                style={{
                  padding: "10px",
                  backgroundColor: "#f08080",
                  color: "#721C24",
                  fontSize: "16px",
                  borderRadius: 0
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleCreate()}
                style={{
                  padding: "10px",
                  backgroundColor: "#5cb3ff",
                  color: "#004085",
                  fontSize: "16px",
                  borderRadius: 0
                }}
              >
                Submit
              </Button>
            </ButtonGroup>
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
