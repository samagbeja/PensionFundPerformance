import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Box } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartInterface {
  title: string;
  label: string;
  labels: string[];
  dataContent: number[];
}

export default function App({
  labels,
  label,
  dataContent,
  title,
}: PieChartInterface) {
  const randomColorVal = () => Math.floor(Math.random() * 255);

  const genColor = (opacity = 1) =>
    labels.map(
      (_) =>
        `rgba(${randomColorVal()},${randomColorVal()},${randomColorVal()},${opacity})`
    );

  const data = {
    labels,
    datasets: [
      {
        label,
        data: dataContent,
        backgroundColor: genColor(),
        borderColor: genColor(0.2),
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItem: "center",
        flexDirection: "column",
      }}
    >
      <Box>{title}</Box>
      <Doughnut data={data} />
    </Box>
  );
}
