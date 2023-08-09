"use client";
import { inputType, presentForm } from "@/utils/formValidation";
import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pension-Funding",
  description: "Pension Systems",
};

const Funding: NextPage = () => {
  const [formstate, setFormstate] = useState({} as any);
  const [error, setError] = useState({} as any);
  const [messageObj, setMessageObj] = useState({} as any);
  const inputArray: inputType[] = [
    {
      name: "fundName",
      type: "text",
      outputName: "Fund Name",
      placeholder: "Fund Name",
    },
    {
      name: "fundType",
      type: "select",
      outputName: "Fund Type",
      placeholder: "Fund Type",
    },

    {
      name: "fundAssets",
      type: "number",
      outputName: "Fund Assets",
      placeholder: "Fund Assets",
    },
    {
      name: "fundStartDate",
      type: "date",
      outputName: "Start Date",
      placeholder: "Start Date",
    },
    {
      name: "status",
      type: "select",
      outputName: "Status",
      placeholder: "Status",
    },
  ];
  const handleSubmit = () => {};

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3} style={{ gap: "20px" }}>
            <Grid xs={12}>
              <Card style={{ marginLeft: "10px", borderRadius: "5px" }}>
                <CardContent style={{ padding: "10px" }}>Funding</CardContent>
              </Card>
            </Grid>
            <Grid xs={12}>
              <Card style={{ marginLeft: "10px", borderRadius: "5px" }}>
                <CardContent>
                  <Grid
                    container
                    spacing={2}
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1, p: 4, pl: 5 }}
                  >
                    {presentForm(
                      inputArray,
                      formstate,
                      setFormstate,
                      error,
                      messageObj,
                      "grid"
                    )}

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Submit
                    </Button>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Funding;
