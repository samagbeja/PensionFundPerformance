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
  title: "Pension-Booking",
  description: "Pension Systems",
};

const Booking: NextPage = () => {
  const [formstate, setFormstate] = useState({} as any);
  const [error, setError] = useState({} as any);
  const [messageObj, setMessageObj] = useState({} as any);
  const inputArray: inputType[] = [
    {
      name: "fundName",
      type: "select",
      outputName: "Fund Name",
      placeholder: "Fund Name",
    },
    {
      name: "investmentName",
      type: "text",
      outputName: "Investment Name",
      placeholder: "Investment Name",
    },

    {
      name: "investmentType",
      type: "select",
      outputName: "Investment Type",
      placeholder: "Investment Type",
    },
    {
      name: "investmentSector",
      type: "select",
      outputName: "Investment Sector",
      placeholder: "Investment Sector",
    },
    {
      name: "investmentAmount",
      type: "number",
      outputName: "Investment Amount",
      placeholder: "Investment Amount",
    },

    {
      name: "investmentStartDate",
      type: "date",
      outputName: "Start Date",
      placeholder: "Start Date",
    },
    {
      name: "investmentEndDate",
      type: "date",
      outputName: "End Date",
      placeholder: "End Date",
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
                <CardContent style={{ padding: "10px" }}>
                  Investment
                </CardContent>
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

export default Booking;
