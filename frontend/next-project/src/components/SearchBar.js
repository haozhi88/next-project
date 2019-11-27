import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
}));

export default function SearchBar() {
  const classes = useStyles();

  const [searchValue, setSearchValue] = useState("");
  const searchLessons = event => {
    event.preventDefault();
    axios
      .get("http://localhost:5000/api/v1/lessons/search_lessons", {
        params: {
          search_value: searchValue
        }
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleChange = event => {
    setSearchValue(event.target.value);
  };

// Voice recognition stuff----------------------------------------------
  const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition; //Initialize SpeechRecognition
const recognition = new SpeechRecognition(); // Create an instance

recognition.continuous = true; //Custom settings for recognition
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.onresult = function(event) { //When a valid word(s) is detected, this function will run
  var text = event.results[0][0].transcript;
  setSearchValue(text)
  console.log(text)
};

const startRecording = e => { //when a button is clicked, this will start the recording
  e.preventDefault();
  console.log("activated");

  recognition.start();
};

const stopRecording = e => { //when a button is clicked, this will stop the browser from recording
  e.preventDefault();
  console.log("stopped");

  recognition.stop();
};
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "0.2px" }}
    >
      <Paper
        onSubmit={e => searchLessons(e)}
        component="form"
        className={classes.root}
        style={{ width: "100vw", border: "1px solid #1589FF" }}
      >
        <InputBase
          value={searchValue}
          onChange={e => handleChange(e)}
          className={classes.input}
          placeholder="Search"
          inputProps={{ "aria-label": "search google maps" }}
        />
        {searchValue ? (
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        ) : (
          <button onClick={e=>{startRecording(e)}}>voice test</button>
        )}
      </Paper>
      <button onClick={e=>{stopRecording(e)}}>End recording</button> 
      {/* Can delete this button later ^. It's only for testing purposes */}
    </div>
  );
}
