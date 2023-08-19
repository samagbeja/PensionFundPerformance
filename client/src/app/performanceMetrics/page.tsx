"use client";
import { inputType, validateForm } from "@/utils/formValidation";
import { useState, FormEvent, useEffect } from "react";

import type { NextPage } from "next";
import type { Metadata } from "next";
import Form from "@/components/form";
import api from "@/utils/api";
import { useSnackbar } from "notistack";

import FullTable from "@/components/FullTable";
import { handleDelete, handleEdit, handleSubmit } from "@/utils/formAction";
import { subDays, subHours } from "date-fns";

export const metadata: Metadata = {
  title: "Pension-Funding",
  description: "Pension Systems",
};

const PerformanceMetrics: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formstate, setFormstate] = useState({} as any);
  const [error, setError] = useState({} as any);
  const [keyIndex, setKeyIndex] = useState(1);
  const [messageObj, setMessageObj] = useState({} as any);

  const [performanceMetricsData, setPerformanceMetricsData] = useState(
    [] as any
  );
  const [investmentData, setInvestmentData] = useState([] as any);

  const tableHeaders = [
    { id: "metricName", title: "Name" },
    { id: "investmentName", title: "Investment Name" },
    { id: "metricValue", title: "Value" },
    { id: "sDate", title: "Date" },
  ];

  const inputArray: inputType[] = [
    {
      name: "investmentId",
      type: "select",
      outputName: "Investment Name",
      placeholder: "Investment Name",
      options: investmentData,
    },
    {
      name: "metricName",
      type: "text",
      outputName: "Name",
      placeholder: "Name",
    },
    {
      name: "metricValue",
      type: "number",
      outputName: "Value",
      placeholder: "Value",
    },
    {
      name: "metricDate",
      type: "date",
      outputName: "Date",
      placeholder: "Date",
    },
  ];

  console.log(formstate, "formstate");
  const url = "performanceMetrics";
  const handleSubmitForm = async (e: FormEvent<any>) =>
    handleSubmit(
      e,
      enqueueSnackbar,
      url,
      inputArray,
      formstate,
      setError,
      setKeyIndex,
      setFormstate,
      setMessageObj,
      getPerformanceMetricsData
    );

  const handleEditForm = async (e: FormEvent<any>) =>
    handleEdit(
      e,
      enqueueSnackbar,
      url,
      inputArray,
      formstate,
      setError,
      setKeyIndex,
      setFormstate,
      setMessageObj,
      getPerformanceMetricsData
    );

  const handleDeleteForm = async () =>
    handleDelete(
      url,
      formstate,
      enqueueSnackbar,
      setFormstate,
      setError,
      setKeyIndex,
      formstate.metricId,
      getPerformanceMetricsData
    );

  const getPerformanceMetricsData = async () => {
    try {
      const res: any = await api.get(url);
      if (res?.data?.payload instanceof Array) {
        let data = res?.data?.payload.map((el: any) => {
          el.sDate = new Date(el.metricDate).toLocaleDateString("en-GB");
          el.metricDate = String(el.metricDate).split("T")[0];

          return el;
        });
        setPerformanceMetricsData(data);
      }
    } catch {
      return setPerformanceMetricsData([]);
    }
  };

  const getInvestMents = async () => {
    try {
      const res: any = await api.get("investment");
      if (res?.data?.payload instanceof Array) {
        let data = res?.data?.payload.map((el: any) => {
          return { value: el.investmentId, label: el.investmentName };
        });
        setInvestmentData(data);
      } else {
        setInvestmentData([]);
      }
    } catch {
      setInvestmentData([]);
    }
  };

  const getData = async () => {
    await getInvestMents();
    await getPerformanceMetricsData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <FullTable
        title="Performance Metrics List"
        tableHeaders={tableHeaders}
        data={performanceMetricsData}
        inputArray={inputArray}
        formstate={formstate}
        setFormstate={setFormstate}
        error={error}
        setError={setError}
        setMessageObj={setMessageObj}
        setKeyIndex={setKeyIndex}
        messageObj={messageObj}
        keyIndex={keyIndex}
        handleEditForm={handleEditForm}
        handleDeleteForm={handleDeleteForm}
        handleSubmit={handleSubmitForm}
      />
    </>
  );
};

export default PerformanceMetrics;
