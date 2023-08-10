"use client";
import {
  Avatar,
  Box,
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
  title: "Dashboard",
  description: "Pension Systems",
};

const Home: NextPage = () => (
  <>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 1,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid xs={12}>
            <Card style={{ marginLeft: "10px", borderRadius: "5px" }}>
              <CardContent style={{ padding: "10px" }}>Dashboard</CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Home;
