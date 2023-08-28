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

const Stakeholders: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formstate, setFormstate] = useState({} as any);
  const [error, setError] = useState({} as any);
  const [keyIndex, setKeyIndex] = useState(1);
  const [messageObj, setMessageObj] = useState({} as any);

  const [stakeholdersData, setStakeholdersData] = useState([] as any);

  const tableHeaders = [
    { id: "stakeholderName", title: "Name" },
    { id: "stakeholderType", title: "Type" },
    { id: "stakeholderEmail", title: "Email" },
    { id: "sDate", title: "Registration Date" },
  ];

  const inputArray: inputType[] = [
    {
      name: "stakeholderName",
      type: "text",
      outputName: " Name",
      placeholder: " Name",
    },
    {
      name: "stakeholderType",
      type: "select",
      outputName: "Type",
      placeholder: "Type",
      options: ["Pension Fund Member", "Trustee", "Sponsor", "Regulator"],
    },
    {
      name: "stakeholderEmail",
      type: "email",
      outputName: "Email",
      placeholder: "Email",
    },
    {
      name: "registrationDate",
      type: "date",
      outputName: "Registration Date",
      placeholder: "Registration Date",
    },
  ];

  console.log(formstate, "formstate");
  const url = "stakeholders";
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
      getStakeholdersData
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
      getStakeholdersData
    );

  const handleDeleteForm = async () =>
    handleDelete(
      url,
      formstate,
      enqueueSnackbar,
      setFormstate,
      setError,
      setKeyIndex,
      formstate.stakeholderId,
      getStakeholdersData
    );

  const getStakeholdersData = async () => {
    try {
      const res: any = await api.get(url);
      if (res?.data?.payload instanceof Array) {
        let data = res?.data?.payload.map((el: any) => {
          el.sDate = new Date(el.registrationDate).toLocaleDateString("en-GB");
          el.registrationDate = String(el.registrationDate).split("T")[0];

          return el;
        });
        setStakeholdersData(data);
      }
    } catch {
      return setStakeholdersData([]);
    }
  };

  const getData = async () => {
    await getStakeholdersData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <FullTable
        title="Stakeholders List"
        tableHeaders={tableHeaders}
        data={stakeholdersData}
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

export default Stakeholders;
