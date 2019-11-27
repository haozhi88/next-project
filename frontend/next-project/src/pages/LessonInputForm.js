/* Import package components */
import React from "react";
import { Container, TextField } from "@material-ui/core";
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles({
//   textInput: {
//     color: "red",
//     borderColor: "green", 
//   }
// });

export default function CreateLessonPage() {
  // const classes = useStyles();

  return (
    <>
      <Container maxWidth="sm">
        {/* Title */}
        <TextField
          id="outlined-full-width"
          label="Title"
          style={{  }}
          placeholder="Title"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />

        {/* Description */}
        <TextField
          id="outlined-full-width"
          label="Description"
          style={{  }}
          placeholder="Description"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true  
          }}
          variant="outlined"
        />

        {/* Skills */}
        <TextField
          id="outlined-full-width"
          label="Skills"
          style={{  }}
          placeholder="Skills"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
      </Container>
    </>
  );
}
