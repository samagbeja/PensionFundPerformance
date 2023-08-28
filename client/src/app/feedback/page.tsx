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

const Feedback: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formstate, setFormstate] = useState({} as any);
  const [error, setError] = useState({} as any);
  const [keyIndex, setKeyIndex] = useState(1);
  const [messageObj, setMessageObj] = useState({} as any);

  const [feedbackData, setFeedbackData] = useState([] as any);
  const [userData, setUserData] = useState([] as any);

  const tableHeaders = [
    { id: "username", title: "Username" },
    { id: "feedbackText", title: "Text" },

    { id: "sDate", title: "Date" },
  ];

  const inputArray: inputType[] = [
    {
      name: "userId",
      type: "select",
      outputName: "Username",
      placeholder: "Username",
      options: userData,
    },
    {
      name: "feedbackText",
      type: "textarea",
      outputName: "Feedback Text",
      placeholder: "Feedback Text",
    },
    {
      name: "feedbackDate",
      type: "date",
      outputName: "Date",
      placeholder: "Date",
    },
  ];

  console.log(formstate, "formstate");
  const url = "feedback";
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
      getFeedbackData
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
      getFeedbackData
    );

  const handleDeleteForm = async () =>
    handleDelete(
      url,
      formstate,
      enqueueSnackbar,
      setFormstate,
      setError,
      setKeyIndex,
      formstate.feedbackId,
      getFeedbackData
    );

  const getFeedbackData = async () => {
    try {
      const res: any = await api.get(url);
      if (res?.data?.payload instanceof Array) {
        let data = res?.data?.payload.map((el: any) => {
          el.sDate = new Date(el.feedbackDate).toLocaleDateString("en-GB");
          el.feedbackDate = String(el.feedbackDate).split("T")[0];

          return el;
        });
        setFeedbackData(data);
      }
    } catch {
      return setFeedbackData([]);
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
    await getFeedbackData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <FullTable
        title="Feedback List"
        tableHeaders={tableHeaders}
        data={feedbackData}
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

export default Feedback;
