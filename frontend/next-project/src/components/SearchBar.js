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
  const searchLessons = (text) => {
    // console.log("before axios call with search value" + text)
    axios
      .get(
        `${getApiRoute(
          "lessons/search_lessons?"
        )}search_value=${text}&teach=${teach}`
      )
      .then(response => {
        console.log(response)
        setLessonsData({
          datas: response.data.data
        });
        // console.log(setLessonsData)
        // console.log("after axios call")
        setSearchValue("");
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handleChange = event => {
    setSearchValue(event.target.value);
  };
  const renderSpeech = record => {
    if (navigator.platform !== "iPhone") {
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
        console.log(text);
      };

      const startRecording = e => {
        //when a button is clicked, this will start the recording
        e.preventDefault();
        console.log("activated");

        recognition.start();
      };

      const stopRecording = e => {
        //when a button is clicked, this will stop the browser from recording
        e.preventDefault();
        console.log("stopped");

        recognition.stop();
      };
      if (record) {
        return (
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
        );
      } else {
        return (
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
        );
      }
    }
  };
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "0.2px" }}
    >
      <Paper
        onSubmit={e => {e.preventDefault()
          searchLessons(searchValue)}}
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
        {renderSpeech(record)}
      </Paper>
    </div>
  );
}
