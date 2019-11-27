/* Import package components */
import React from "react";
import { Container, TextField } from "@material-ui/core";

export default function SignUpInputForm({ userSignUp, setUserSignUp }) {
  return (
    <>
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
          type="name"
          value={userSignUp.name}
          onChange={e =>
            setUserSignUp({
              name: e.target.value,
              email: userSignUp.email,
              password: userSignUp.password
            })
          }
        />

        {/* Email */}
        <TextField
          id="email-input"
          label="Email"
          placeholder="Email"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
          type="email"
          value={userSignUp.email}
          onChange={e =>
            setUserSignUp({
              name: userSignUp.name,
              email: e.target.value,
              password: userSignUp.password
            })
          }
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
          value={userSignUp.password}
          onChange={e =>
            setUserSignUp({
              name: userSignUp.name,
              email: userSignUp.email,
              password: e.target.value
            })
          }
        />
      </Container>
    </>
  );
}
