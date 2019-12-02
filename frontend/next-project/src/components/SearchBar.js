import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { getApiRoute } from "../global";
import MicIcon from "@material-ui/icons/Mic";
import Divider from "@material-ui/core/Divider";

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

export default function SearchBar({ setLessonsData, teach }) {
  const classes = useStyles();
  const [record, setRecord] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchLessons = event => {
    event.preventDefault();
    axios
      .get(
        `${getApiRoute(
          "lessons/search_lessons?"
        )}search_value=${searchValue}&teach=${teach}`
      )
      .then(response => {
        // console.log(response);
        setLessonsData({
          datas: response.data.data
        });
        setSearchValue("");
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

  recognition.onresult = function(event) {
    //When a valid word(s) is detected, this function will run
    var text = event.results[0][0].transcript;
    setSearchValue(text);
  };

  const startRecording = e => {
    //when a button is clicked, this will start the recording
    e.preventDefault();
    recognition.start();
  };

  const stopRecording = e => {
    //when a button is clicked, this will stop the browser from recording
    e.preventDefault();
    // console.log("stopped");

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
        style={{
          width: "100vw",
          border: "1px solid #1589FF",
          borderRadius: "0px"
        }}
      >
        <InputBase
          value={searchValue}
          onChange={e => handleChange(e)}
          className={classes.input}
          placeholder="Search"
          inputProps={{ "aria-label": "search google maps" }}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
        <Divider orientation="vertical" />
        {record ? (
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
            onClick={e => {
              stopRecording(e);
              setRecord(false);
            }}
          >
            <MicIcon style={{ color: "1589FF" }} />
          </IconButton>
        ) : (
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
            onClick={e => {
              startRecording(e);
              setRecord(true);
            }}
          >
            <MicIcon />
          </IconButton>
        )}
      </Paper>
    </div>
  );
}
