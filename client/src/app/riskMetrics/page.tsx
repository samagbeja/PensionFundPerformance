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
    { id: "riskCategory", title: "Risk Category" },
    { id: "investmentName", title: "Investment Name" },
    { id: "riskLevel", title: "Risk Level" },
    { id: "riskIndicator", title: "Risk Indicator" },
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
      name: "riskCategory",
      type: "select",
      outputName: "Risk Category",
      placeholder: "Risk Category",
      options: ["Market Risk", "Credit Risk"],
    },
    {
      name: "riskLevel",
      type: "number",
      outputName: "Risk Level",
      placeholder: "Risk Level",
    },
    {
      name: "riskDate",
      type: "date",
      outputName: "Date",
      placeholder: "Date",
    },
    {
      name: "riskIndicator",
      type: "text",
      outputName: "Risk Indicator",
      placeholder: "Risk Indicator",
      disabled: true,
    },
  ];

  console.log(formstate, "formstate");
  const url = "riskMetrics";
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
      formstate.riskId,
      getPerformanceMetricsData
    );

  const getPerformanceMetricsData = async () => {
    try {
      const res: any = await api.get(url);
      if (res?.data?.payload instanceof Array) {
        let data = res?.data?.payload.map((el: any) => {
          el.sDate = new Date(el.riskDate).toLocaleDateString("en-GB");
          el.riskDate = String(el.riskDate).split("T")[0];

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
    let val = "";
    if (formstate.riskLevel > 69) {
      val = "HIGH";
    } else if (formstate.riskLevel >= 40) {
      val = "MEDIUM";
    } else if (formstate.riskLevel >= 0) {
      val = "LOW";
    }

    setFormstate({ ...formstate, riskIndicator: val });
  }, [formstate.riskLevel]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <FullTable
        title="Risk Metrics List"
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
