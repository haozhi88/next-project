/* Import package components */
import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { Button, ButtonGroup } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { route } from "../global";

/* Import app components */
import DialogPage from "../components/DialogPage";

export default function CreateEventPage({ parentRouteTo }) {
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

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div style={{position: "relative", top: "150px"}}>
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
          />
        </div>
  
        <br />
        <div style={ContainerStyles}>
          <ButtonGroup fullWidth aria-label="full width button group" style={{ position: "absolute", bottom: 0, height:"7vh"}}>
            <Button onClick={() => parentRouteTo(route.close)}  style={{ padding:"10px", backgroundColor:"#f08080" , color:"#721C24", fontSize: "16px", borderRadius: 0}}>Cancel</Button>
            <Button onClick={() => routeTo(route.todo)} style={{ padding:"10px",backgroundColor:"#5cb3ff", color:"#004085", fontSize: "16px", borderRadius: 0}}>Submit</Button>
          </ButtonGroup>
        </div>
      </MuiPickersUtilsProvider>
      <DialogPage
        routeTo={routeTo}
        routeOption={routeOption}
        dialogOpen={dialogOpen}
      />
    </>
  );
}
