/* Import package components */
import React from "react";
import { Container, TextField } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    secondary: { main: "#1589FF" }
  }
});

export default function CreateLessonPage({
  lessonInput,
  setLessonInput,
  skills
}) {
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

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
                index: lessonInput.index
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
                index: lessonInput.index
              })
            }
            color="secondary"
          />
          <FormControl
            variant="outlined"
            margin="normal"
            fullWidth
            style={{ align: "left" }}
            color="secondary"
          >
            <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
              Skill
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              // value={age}
              // onChange={handleChange}
              value={lessonInput.index}
              onChange={e =>
                setLessonInput({
                  title: lessonInput.title,
                  description: lessonInput.description,
                  index: e.target.value
                })
              }
              labelWidth={labelWidth}
              align="left"
            >
              {/* <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem> */}
              {skills.map((skillList, index) => (
                <MenuItem value={index} key={index}>
                  {skillList.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Skills */}
          {/* TODO: Let user select */}
        </Container>
      </MuiThemeProvider>
    </>
  );
}
