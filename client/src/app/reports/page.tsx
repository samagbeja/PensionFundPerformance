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

const Reports: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formstate, setFormstate] = useState({} as any);
  const [error, setError] = useState({} as any);
  const [keyIndex, setKeyIndex] = useState(1);
  const [messageObj, setMessageObj] = useState({} as any);

  const [reportsData, setReportsData] = useState([] as any);
  const [investmentData, setInvestmentData] = useState([] as any);

  const tableHeaders = [
    { id: "reportType", title: "Type" },
    { id: "reportFilePath", title: "File Path" },

    { id: "sDate", title: "Date" },
  ];

  const inputArray: inputType[] = [
    {
      name: "reportType",
      type: "select",
      outputName: "Type",
      placeholder: "Type",
      options: ["Performance", "Investment Holdings", "Fees", "Governance"],
    },
    {
      name: "reportDate",
      type: "date",
      outputName: "Report Date",
      placeholder: "Report Date",
    },
    {
      name: "reportFilePath",
      type: "text",
      outputName: "File Path",
      placeholder: "File Path",
    },
  ];

  console.log(formstate, "formstate");
  const url = "reports";
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
      getReportsData
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
      getReportsData
    );

  const handleDeleteForm = async () =>
    handleDelete(
      url,
      formstate,
      enqueueSnackbar,
      setFormstate,
      setError,
      setKeyIndex,
      formstate.reportId,
      getReportsData
    );

  const getReportsData = async () => {
    try {
      const res: any = await api.get(url);
      if (res?.data?.payload instanceof Array) {
        let data = res?.data?.payload.map((el: any) => {
          el.sDate = new Date(el.reportDate).toLocaleDateString("en-GB");
          el.reportDate = String(el.reportDate).split("T")[0];

          return el;
        });
        setReportsData(data);
      }
    } catch {
      return setReportsData([]);
    }
  };

  const getData = async () => {
    await getReportsData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <FullTable
        title="Reports List"
        tableHeaders={tableHeaders}
        data={reportsData}
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

export default Reports;
