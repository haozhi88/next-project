import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Button, ButtonGroup } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    width: 345,
    borderRadius:16,
    marginTop: "10px",
    border: "1px solid #1589FF", 
  },
  media: {
    height: 200,
  },
  contentText: {
    color:"#4c4c4c",
    fontSize: "15px"
  }
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://desmond-nextagram.s3-ap-southeast-1.amazonaws.com/cat4.png"
          title="Contemplative Reptile"
        />
        <CardContent align="left">
          <Typography gutterBottom variant="h5" component="h2">
            Computer Science
          </Typography>
          <Typography variant="body2" className={classes.contentText} component="p" >Request By: <strong>Someone</strong></Typography>
          <Typography variant="body2" className={classes.contentText} component="p" >Status: <strong>Pending</strong></Typography>
          <Typography variant="body2" className={classes.contentText} component="p" >Date: <strong>03 December 2019</strong></Typography>
          <Typography variant="body2" className={classes.contentText} component="p" >Time: <strong>5:00 P.M.</strong></Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{padding:"0px"}}>
      <ButtonGroup fullWidth aria-label="full width button group" >
          <Button style={{ backgroundColor:"#f08080", color:"#721C24", fontSize: "16px"}}>Decline</Button>
          <Button style={{ backgroundColor:"#90ee90" , color:"#155724", fontSize: "16px"}}>Accept</Button>
        </ButtonGroup>
      </CardActions>
    </Card>
    </div>
  );
}