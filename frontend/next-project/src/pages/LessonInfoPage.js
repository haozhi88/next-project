/* Import package components */
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import { getApiRoute } from "../global";
import axios from "axios";

/* Import app components */
import LoadingNav from "../components/LoadingNav";

/* CSS Styles */
const useStyles = makeStyles(theme => ({
  card: {
    width: 360,
    borderRadius: 16,
    border: "1px solid #1589FF",
    color: "#393333"
  },
  media: {
    height: 300,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  cardContent: {
    color: "#4c4c4c"
  }
}));

export default function LessonInfoPage({ lesson }) {
  const [isLoading, setIsLoading] = useState(true) 
  const [distance, setDistance] = useState(null);
  useEffect(() => {
    axios.get(`${getApiRoute("users/")}${lesson.owner_id}`).then(response => {
      const userLatitude = localStorage.getItem("userLatitude");
      const userLongtitude = localStorage.getItem("userLongtitude");
      setIsLoading(false)
      axios
        .get(
          `https://graphhopper.com/api/1/matrix?point=${response.data.data.latitude},${response.data.data.longtitude}&point=${userLatitude},${userLongtitude}&type=json&vehicle=car&debug=true&out_array=weights&out_array=times&out_array=distances&key=5dcb6221-e534-491b-863b-3e1c72ab7264`
        )
        .then(result => {
          // console.log(result);
          const distancesArr = result.data.distances;
          // console.log(distancesArr);
          const allDistances = [];
          distancesArr.map(arr => {
            arr.map(val => {
              if (val != 0) {
                allDistances.push(val);
              }
            });
          });
          if (allDistances.length > 0) {
            const totalDist = allDistances.reduce((a, b) => {
              return a + b;
            });
            let avgDist = totalDist / allDistances.length;
            setDistance(avgDist);
          } else {
            setDistance(0);
          }
        })
        .catch(err => {
          console.log(err);
        });
    });
  }, []);
  const classes = useStyles();
  return (
    <>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={lesson.image_url}
          title="Lesson image"
        />
        <CardHeader
          title={<h3  style={{ margin:"0px", padding:"0px" }}>{lesson.title}</h3>}
          // subheader="November 25, 2019"
        />
        <CardContent className={classes.cardContent}>
          <Typography variant="subtitle1" component="p" align="justify">
            <strong>Description</strong>
          </Typography>
          <Typography variant="body2" component="p" align="justify">
            {lesson.description}
          </Typography>
        </CardContent>
        <CardContent className={classes.cardContent}>
          <Typography variant="subtitle1" component="p" align="justify">
            <strong>Author:</strong>
          </Typography>
          <Typography variant="body2" component="p" align="justify">
            {lesson.owner_name}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="subtitle1" component="p" align="justify">
            <strong>Skills</strong>
          </Typography>
          <Typography variant="body2" component="p" align="justify">
            {lesson.skill_name}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="subtitle1" component="p" align="justify">
            <strong>Distance</strong>
          </Typography>
          <Typography variant="body2" component="p" align="justify">
            {(distance / 1000).toFixed(1)} KM
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
