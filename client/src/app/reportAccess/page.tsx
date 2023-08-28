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

const ReportAccess: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formstate, setFormstate] = useState({} as any);
  const [error, setError] = useState({} as any);
  const [keyIndex, setKeyIndex] = useState(1);
  const [messageObj, setMessageObj] = useState({} as any);

  const [reportAccessData, setReportAccessData] = useState([] as any);
  const [reportData, setReportData] = useState([] as any);
  const [userData, setUserData] = useState([] as any);

  const tableHeaders = [
    { id: "reportType", title: "Report Type" },
    { id: "username", title: "User Name" },
    { id: "accessLevel", title: "Access Level" },
  ];

  const inputArray: inputType[] = [
    {
      name: "reportId",
      type: "select",
      outputName: "Report Type",
      placeholder: "Report Type",
      options: reportData,
    },
    {
      name: "userId",
      type: "select",
      outputName: "User",
      placeholder: "User",
      options: userData,
    },
    {
      name: "accessLevel",
      type: "select",
      outputName: "Access Level",
      placeholder: "Access Level",
      options: ["Read-Only", "Full-access"],
    },
  ];

  console.log(formstate, "formstate");
  const url = "reportAccess";
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
      getReportAccessData
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
      getReportAccessData
    );

  const handleDeleteForm = async () =>
    handleDelete(
      url,
      formstate,
      enqueueSnackbar,
      setFormstate,
      setError,
      setKeyIndex,
      formstate.accessId,
      getReportAccessData
    );

  const getReportAccessData = async () => {
    try {
      const res: any = await api.get(url);
      if (res?.data?.payload instanceof Array) {
        let data = res?.data?.payload.map((el: any) => {
          el.sDate = new Date(el.metricDate).toLocaleDateString("en-GB");
          el.metricDate = String(el.metricDate).split("T")[0];

          return el;
        });
        setReportAccessData(data);
      }
    } catch {
      return setReportAccessData([]);
    }
  };

  const getReports = async () => {
    try {
      const res: any = await api.get("reports");
      if (res?.data?.payload instanceof Array) {
        let data = res?.data?.payload.map((el: any) => {
          return { value: el.reportId, label: el.reportType };
        });
        setReportData(data);
      } else {
        setReportData([]);
      }
    } catch {
      setReportData([]);
    }
  };

  const getUsers = async () => {
    try {
      const res: any = await api.get("users");
      if (res?.data?.payload instanceof Array) {
        let data = res?.data?.payload.map((el: any) => {
          return { value: el.userId, label: el.username };
        });
        setUserData(data);
      } else {
        setUserData([]);
      }
    } catch {
      setUserData([]);
    }
  };

  const getData = async () => {
    await getUsers();
    await getReports();
    await getReportAccessData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <FullTable
        title="Report Access List"
        tableHeaders={tableHeaders}
        data={reportAccessData}
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

export default ReportAccess;
