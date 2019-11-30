/* Import package components */
import React from "react";
import { Container, TextField } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";


const theme = createMuiTheme({
  palette: {
    secondary: { main: "#1589FF" } 
  }
});

export default function SignInInputForm({ userSignIn, setUserSignIn }) {
  return (
    <>
     <MuiThemeProvider theme={theme}>
      <Container maxWidth="sm">
        {/* Username */}
        <TextField
          id="username-input"
          label="Username"
          placeholder="Username"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
          type="text"
          value={userSignIn.name}
          onChange={e =>
            setUserSignIn({
              name: e.target.value,
              password: userSignIn.password
            })
          }
          color="secondary"
        />

        {/* Password */}
        <TextField
          id="password-input"
          label="Password"
          placeholder="Password"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
          type="password"
          value={userSignIn.password}
          onChange={e =>
            setUserSignIn({
              name: userSignIn.name,
              password: e.target.value
            })
          }
          color="secondary"
        />
      </Container>
      </MuiThemeProvider>
    </>
  );
}
