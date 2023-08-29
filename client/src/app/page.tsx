"use client";
import { useState, useEffect } from "react";
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
import BarChart from "@/components/BarChart";
import PieChart from "@/components/PieChart";
import api from "@/utils/api";
import List from "@/components/List";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Pension Systems",
};

const Home: NextPage = () => {
  const [totalInvPerFund, setTotalInvPerFund] = useState([]);
  const [totalPerfPerInv, setTotalPerfPerInv] = useState([]);
  const [totalRiskPerInv, setTotalRiskPerInv] = useState([]);
  const [fundPerPerf, setFundPerPerf] = useState([]);
  const [fundActive, setFundActive] = useState([]);
  const [commChannel, setCommChannel] = useState([]);

  const fetchTotalInvPerFund = async () => {
    try {
      const res: any = await api.get("fund/investment");
      if (res?.data?.payload instanceof Array) {
        let data = res?.data?.payload;
        setTotalInvPerFund(data);
      } else {
        setTotalInvPerFund([]);
      }
    } catch {
      setTotalInvPerFund([]);
    }
  };

  const fetchTotalPerfPerFund = async () => {
    try {
      const res: any = await api.get("performanceMetrics/investment");
      if (res?.data?.payload instanceof Array) {
        let data = res?.data?.payload;
        setTotalPerfPerInv(data);
      } else {
        setTotalPerfPerInv([]);
      }
    } catch {
      setTotalPerfPerInv([]);
    }
  };

  const fetchTotalRiskPerFund = async () => {
    try {
      const res: any = await api.get("riskMetrics/investment");
      if (res?.data?.payload instanceof Array) {
        let data = res?.data?.payload;
        setTotalRiskPerInv(data);
      } else {
        setTotalRiskPerInv([]);
      }
    } catch {
      setTotalRiskPerInv([]);
    }
  };

  const fetchFundActive = async () => {
    try {
      const res: any = await api.get("fundactive");
      if (res?.data?.payload instanceof Array) {
        let data = res?.data?.payload;
        setFundActive(data);
      } else {
        setFundActive([]);
      }
    } catch {
      setFundActive([]);
    }
  };

  const fetchFundPerPerf = async () => {
    try {
      const res: any = await api.get("performanceMetrics/fund");
      if (res?.data?.payload instanceof Array) {
        let data = res?.data?.payload;
        setFundPerPerf(data);
      } else {
        setFundPerPerf([]);
      }
    } catch {
      setFundPerPerf([]);
    }
  };

  const fetchCommChannel = async () => {
    try {
      const res: any = await api.get("communicationChannels/count");
      if (res?.data?.payload instanceof Array) {
        let data = res?.data?.payload;
        setCommChannel(data);
      } else {
        setCommChannel([]);
      }
    } catch {
      setCommChannel([]);
    }
  };

  const fetchAllContent = async () => {
    await fetchCommChannel();
    await fetchFundPerPerf();
    await fetchFundActive();
    await fetchTotalRiskPerFund();
    await fetchTotalPerfPerFund();
    await fetchTotalInvPerFund();
  };

  useEffect(() => {
    fetchAllContent();
  }, []);

  return (
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
            <Grid xs={12} md={6} style={{ marginTop: "20px" }}>
              <Card>
                <CardContent style={{ padding: "10px", minHeight: "300px" }}>
                  <BarChart
                    title="Total Investment Per Fund"
                    label="Investment per Fund"
                    labels={totalInvPerFund.map((el: any) => el?.fundName)}
                    dataContent={totalInvPerFund.map((el: any) => el?.count)}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} md={6} style={{ marginTop: "20px" }}>
              <Card>
                <CardContent style={{ padding: "10px", minHeight: "300px" }}>
                  <BarChart
                    title="Performance metrics of each Investment"
                    label="Performance metrics per Investment"
                    labels={totalPerfPerInv.map(
                      (el: any) => el?.investmentName
                    )}
                    dataContent={totalPerfPerInv.map(
                      (el: any) => el?.metricValue
                    )}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} md={6} style={{ marginTop: "20px" }}>
              <Card>
                <CardContent style={{ padding: "10px", minHeight: "300px" }}>
                  <BarChart
                    title="Risk metrics of each Investment"
                    label="Risk metrics per Investment"
                    labels={totalRiskPerInv.map(
                      (el: any) => el?.investmentName
                    )}
                    dataContent={totalRiskPerInv.map(
                      (el: any) => el?.riskLevel
                    )}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} md={6} style={{ marginTop: "20px" }}>
              <Card>
                <CardContent style={{ padding: "10px", minHeight: "300px" }}>
                  <PieChart
                    title="Fund Performance"
                    label="Fund Performance"
                    labels={fundPerPerf.map((el: any) => el?.fundName)}
                    dataContent={fundPerPerf.map((el: any) => el?.metricValue)}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} md={6} style={{ marginTop: "20px" }}>
              <Card>
                <CardContent style={{ padding: "10px", minHeight: "300px" }}>
                  <PieChart
                    title="Communication Channels"
                    label="Communication Channels"
                    labels={commChannel.map((el: any) => el?.channelType)}
                    dataContent={commChannel.map((el: any) => el?.count)}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} md={6} style={{ marginTop: "20px" }}>
              <Card>
                <CardContent style={{ padding: "10px", minHeight: "300px" }}>
                  <List
                    title="List of Active Funds"
                    data={fundActive}
                    tableHeaders={[
                      { id: "fundName", title: "Fund Name" },
                      { id: "fundType", title: "Fund Type" },
                      { id: "fundAssets", title: "Fund Assets" },
                    ]}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Home;
