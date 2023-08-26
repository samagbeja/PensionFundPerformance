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

const WebApplications: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formstate, setFormstate] = useState({} as any);
  const [error, setError] = useState({} as any);
  const [keyIndex, setKeyIndex] = useState(1);
  const [messageObj, setMessageObj] = useState({} as any);

  const [webApplicationsData, setWebApplicationsData] = useState([] as any);

  const tableHeaders = [
    { id: "appName", title: "Name" },
    { id: "appDescription", title: "Description" },
    { id: "appVendor", title: "Vendor" },
    { id: "status", title: "Status" },
    { id: "sDate", title: "Integration Date" },
  ];

  const inputArray: inputType[] = [
    {
      name: "appName",
      type: "text",
      outputName: "Name",
      placeholder: "Name",
    },
    {
      name: "appDescription",
      type: "text",
      outputName: "Description",
      placeholder: "Description",
    },
    {
      name: "appVendor",
      type: "text",
      outputName: "Vendor",
      placeholder: "Vendor",
    },
    {
      name: "status",
      type: "select",
      outputName: "Status",
      placeholder: "Status",
      options: ["Active", "Inactive"],
    },
    {
      name: "integrationDate",
      type: "date",
      outputName: "Integration Date",
      placeholder: "Integration Date",
    },
  ];

  console.log(formstate, "formstate");
  const url = "webApplications";
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
      getWebApplicationsData
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
      getWebApplicationsData
    );

  const handleDeleteForm = async () =>
    handleDelete(
      url,
      formstate,
      enqueueSnackbar,
      setFormstate,
      setError,
      setKeyIndex,
      formstate.appId,
      getWebApplicationsData
    );

  const getWebApplicationsData = async () => {
    try {
      const res: any = await api.get(url);
      if (res?.data?.payload instanceof Array) {
        let data = res?.data?.payload.map((el: any) => {
          el.sDate = new Date(el.integrationDate).toLocaleDateString("en-GB");
          el.integrationDate = String(el.integrationDate).split("T")[0];

          return el;
        });
        setWebApplicationsData(data);
      }
    } catch {
      return setWebApplicationsData([]);
    }
  };

  const getData = async () => {
    await getWebApplicationsData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <FullTable
        title="Web Application List"
        tableHeaders={tableHeaders}
        data={webApplicationsData}
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

export default WebApplications;
