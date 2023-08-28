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

const CommunicationChannels: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formstate, setFormstate] = useState({} as any);
  const [error, setError] = useState({} as any);
  const [keyIndex, setKeyIndex] = useState(1);
  const [messageObj, setMessageObj] = useState({} as any);

  const [communicationChannelsData, setCommunicationChannelsData] = useState(
    [] as any
  );

  const tableHeaders = [
    { id: "channelName", title: "Name" },
    { id: "channelType", title: "Type" },
  ];

  const inputArray: inputType[] = [
    {
      name: "channelName",
      type: "select",
      outputName: "Name",
      placeholder: "Name",
      options: ["Messaging", "Forum", "Email"],
    },
    {
      name: "channelType",
      type: "select",
      outputName: "Description",
      placeholder: "Description",
      options: ["Real-time Chat", "Asynchronous Messaging"],
    },
  ];

  console.log(formstate, "formstate");
  const url = "communicationChannels";
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
      getcommunicationChannelsData
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
      getcommunicationChannelsData
    );

  const handleDeleteForm = async () =>
    handleDelete(
      url,
      formstate,
      enqueueSnackbar,
      setFormstate,
      setError,
      setKeyIndex,
      formstate.channelId,
      getcommunicationChannelsData
    );

  const getcommunicationChannelsData = async () => {
    try {
      const res: any = await api.get(url);
      if (res?.data?.payload instanceof Array) {
        let data = res?.data?.payload;
        setCommunicationChannelsData(data);
      }
    } catch {
      return setCommunicationChannelsData([]);
    }
  };

  const getData = async () => {
    await getcommunicationChannelsData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <FullTable
        title="Communication Channel List"
        tableHeaders={tableHeaders}
        data={communicationChannelsData}
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

export default CommunicationChannels;
