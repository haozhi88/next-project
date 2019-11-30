/* Import package components */
import React from "react";
import { Container, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// const useStyles = makeStyles({
//   textInput: {
//     color: "red",
//     borderColor: "green",
//   }
// });

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }}));

  const theme = createMuiTheme({
    palette: {
      secondary: { main: "#1589FF" } 
    }
  });


export default function CreateLessonPage({ lessonInput, setLessonInput }) {
  // const classes = useStyles();
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  const handleChange = event => {
    setAge(event.target.value);
  };

  return (
    <>
     <MuiThemeProvider theme={theme}>
      <Container maxWidth="sm">
        {/* Title */}
        <TextField
          id="outlined-full-width"
          label="Title"
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
          color="secondary"
        />

        {/* Description */}
        <TextField
          id="outlined-full-width"
          label="Description"
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
          color="secondary"
        />
        <FormControl variant="outlined" margin="normal" fullWidth style={{ align :"left" }} color="secondary">
          <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
            Skill
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={age}
            onChange={handleChange}
            labelWidth={labelWidth}
            align="left"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        {/* Skills */}
        {/* TODO: Let user select */}
      </Container>
      </MuiThemeProvider>
    </>
  );
}
