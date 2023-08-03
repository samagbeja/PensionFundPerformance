"use client";
import type { NextPage } from "next";
import { useState, ChangeEvent, FormEvent } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Link from "next/link";
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import { inputType, presentForm, validateForm } from "@/utils/formValidation";

const Home: NextPage = () => {
  const [formstate, setFormstate] = useState({} as any);
  const [error, setError] = useState({} as any);
  const [messageObj, setMessageObj] = useState({} as any);
  const inputArray: inputType[] = [
    {
      name: "username",
      type: "text",
      outputName: "Username",
      placeholder: "Username",
    },
    {
      name: "email",
      type: "email",
      outputName: "Email Address",
      placeholder: "Email Address",
    },
    {
      name: "password",
      type: "password",
      outputName: "Password",
      placeholder: "Password",
    },
    {
      name: "userType",
      type: "select",
      outputName: "User Type",
      placeholder: "User Type",
      options: [
        "Pension Fund Manager",
        "Pension Fund Member",
        "Trustee",
        "Administrator",
      ],
    },
  ];

  console.log(formstate, "formstate");
  const handleSubmit = (e: FormEvent<any>) => {
    e.preventDefault();
    let status = validateForm(inputArray, formstate, setError, setMessageObj);
    console.log(status);
    console.log(formstate);
    if (status) {
      // sign up
    }
  };
  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          //   marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, width: "90%" }}
        >
          {presentForm(inputArray, formstate, setFormstate, error, messageObj)}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              <Link href="/">{"Have an account? Sign In"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
