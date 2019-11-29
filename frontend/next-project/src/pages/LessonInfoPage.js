/* Import package components */
import React from "react";
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

/* CSS Styles */
const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    borderRadius: 16,
    border: "1px solid #1589FF", 
    color:"#393333",
  },
  media: {
    height: 0,
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
  cardContent:{
    color:"#4c4c4c",
  }
}));

export default function LessonInfoPage() {
  const [distance, setDistance] = useState(null)
  const classes = useStyles();

useEffect(() => {
  Axios.get(`${getApiRoute("lessons/")}`, )
})


  return (
    <>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://miro.medium.com/max/1272/1*M9le42saJxWlOYyYvhKtPA.jpeg"
          title="Machine Learning"
        />
        <CardHeader
          style={{ textAlign: "left" }}
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              A
            </Avatar>
          }
          title="Machine Learning"
          subheader="November 25, 2019"
        />
        <CardContent className={classes.cardContent}>
          <Typography
            variant="subtitle1"
            component="p"
            align="justify"
          >
            <strong>Description</strong>
          </Typography>
          <Typography
            variant="body2"
            component="p"
            align="justify"
          >
            Machine learning is the science of getting computers to act without
            being explicitly programmed. In the past decade, machine learning
            has given us self-driving cars, practical speech recognition,
            effective web search, and a vastly improved understanding of the
            human genome. Machine learning is so pervasive today that you
            probably use it dozens of times a day without knowing it. Many
            researchers also think it is the best way to make progress towards
            human-level AI.
            <br />
            <br />
            Machine learning is the science of getting computers to act without
            being explicitly programmed. In the past decade, machine learning
            has given us self-driving cars, practical speech recognition,
            effective web search, and a vastly improved understanding of the
            human genome. Machine learning is so pervasive today that you
            probably use it dozens of times a day without knowing it. Many
            researchers also think it is the best way to make progress towards
            human-level AI.
          </Typography>
        </CardContent>
        <CardContent className={classes.cardContent}>
          <Typography
            variant="subtitle1"
            component="p"
            align="justify"
          >
            <strong>Author:</strong>
          </Typography>
          <Typography
            variant="body2"
            component="p"
            align="justify"
          >
            Andrew Ng
          </Typography>
        </CardContent>
        <CardContent>
          <Typography
            variant="subtitle1"
            component="p"
            align="justify"
          >
            <strong>Skills</strong>
          </Typography>
          <Typography
            variant="body2"
            component="p"
            align="justify"
          >
            coding, algorithm
          </Typography>
        </CardContent>

        <CardContent>
          <Typography
            variant="subtitle1"
            component="p"
            align="justify"
          >
            <strong>Distance</strong>
          </Typography>
          <Typography
            variant="body2"
            component="p"
            align="justify"
          >
            Replace me
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
