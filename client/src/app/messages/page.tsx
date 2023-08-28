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

const Messages: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formstate, setFormstate] = useState({} as any);
  const [error, setError] = useState({} as any);
  const [keyIndex, setKeyIndex] = useState(1);
  const [messageObj, setMessageObj] = useState({} as any);

  const [messagesData, setMessagesData] = useState([] as any);
  const [stakeholdersData, setStakeholdersData] = useState([] as any);

  const tableHeaders = [
    { id: "senderName", title: "Sender Name" },
    { id: "recieverName", title: "Reciever Name" },
    { id: "subject", title: "Subject" },
    { id: "content", title: "Content" },
    { id: "sDate", title: "Date" },
  ];

  const inputArray: inputType[] = [
    {
      name: "senderId",
      type: "select",
      outputName: "Sender Name",
      placeholder: "Sender Name",
      options: stakeholdersData,
    },
    {
      name: "recieverId",
      type: "select",
      outputName: "Reciever Name",
      placeholder: "Reciever Name",
      options: stakeholdersData,
    },
    {
      name: "subject",
      type: "text",
      outputName: "Subject",
      placeholder: "Subject",
    },
    {
      name: "content",
      type: "textarea",
      outputName: "Content",
      placeholder: "Content",
    },
    {
      name: "sentDate",
      type: "date",
      outputName: "Sent Date",
      placeholder: "Sent Date",
    },
  ];

  console.log(formstate, "formstate");
  const url = "messages";
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
      getMessagesData
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
      getMessagesData
    );

  const handleDeleteForm = async () =>
    handleDelete(
      url,
      formstate,
      enqueueSnackbar,
      setFormstate,
      setError,
      setKeyIndex,
      formstate.messageId,
      getMessagesData
    );

  const getMessagesData = async () => {
    try {
      const res: any = await api.get(url);
      if (res?.data?.payload instanceof Array) {
        let data = res?.data?.payload.map((el: any) => {
          el.sDate = new Date(el.sentDate).toLocaleDateString("en-GB");
          el.sentDate = String(el.sentDate).split("T")[0];

          return el;
        });
        setMessagesData(data);
      }
    } catch {
      return setMessagesData([]);
    }
  };

  const getStakeholders = async () => {
    try {
      const res: any = await api.get("stakeholders");
      if (res?.data?.payload instanceof Array) {
        let data = res?.data?.payload.map((el: any) => {
          return { value: el.stakeholderId, label: el.stakeholderName };
        });
        setStakeholdersData(data);
      } else {
        setStakeholdersData([]);
      }
    } catch {
      setStakeholdersData([]);
    }
  };

  const getData = async () => {
    await getStakeholders();
    await getMessagesData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <FullTable
        title="Messages List"
        tableHeaders={tableHeaders}
        data={messagesData}
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

export default Messages;
