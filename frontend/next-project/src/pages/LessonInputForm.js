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

export default function CreateLessonPage({ lessonInput, setLessonInput }) {
  // const classes = useStyles();

  return (
    <>
      <Container maxWidth="sm">
        {/* Title */}
        <TextField
          id="outlined-full-width"
          label="Title"
          style={{}}
          placeholder="Title"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
          type="title"
          value={lessonInput.title}
          onChange={e =>
            setLessonInput({
              title: e.target.value,
              description: lessonInput.description,
              skill: lessonInput.skill
            })
          }
        />

        {/* Description */}
        <TextField
          id="outlined-full-width"
          label="Description"
          style={{}}
          placeholder="Description"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
          type="title"
          value={lessonInput.description}
          onChange={e =>
            setLessonInput({
              title: lessonInput.title,
              description: e.target.value,
              skill: lessonInput.skill
            })
          }
        />

        {/* Skills */}
        {/* TODO: Let user select */}
      </Container>
    </>
  );
}
