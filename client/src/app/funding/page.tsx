"use client";
import { inputType, validateForm } from "@/utils/formValidation";
import { useState, FormEvent } from "react";

import type { NextPage } from "next";
import type { Metadata } from "next";
import Form from "@/components/form";
import api from "@/utils/api";
import { useSnackbar } from "notistack";

export const metadata: Metadata = {
  title: "Pension-Funding",
  description: "Pension Systems",
};

const Funding: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formstate, setFormstate] = useState({} as any);
  const [error, setError] = useState({} as any);
  const [keyIndex, setKeyIndex] = useState(1);
  const [messageObj, setMessageObj] = useState({} as any);
  const inputArray: inputType[] = [
    {
      name: "fundName",
      type: "text",
      outputName: "Fund Name",
      placeholder: "Fund Name",
    },
    {
      name: "fundType",
      type: "select",
      outputName: "Fund Type",
      placeholder: "Fund Type",
      options: ["Raising", "Trust"],
    },

    {
      name: "fundAssets",
      type: "number",
      outputName: "Fund Assets",
      placeholder: "Fund Assets",
    },
    {
      name: "fundStartDate",
      type: "date",
      outputName: "Start Date",
      placeholder: "Start Date",
    },
    {
      name: "status",
      type: "select",
      outputName: "Status",
      placeholder: "Status",
      options: ["Active"],
    },
  ];
  const handleSubmit = async (e: FormEvent<any>) => {
    try {
      e.preventDefault();
      let status = validateForm(inputArray, formstate, setError, setMessageObj);
      console.log(status);
      console.log(formstate);
      if (status) {
        // sign up

        const res: any = await api.post("fund", formstate);
        console.log(res, "res");
        enqueueSnackbar(res?.data?.message, {
          variant: "success",
        });
        setFormstate({});
        setError({});
        setKeyIndex(Math.random());
        // dispatch(loginUser(res?.data?.payload));
        // router.push("/");
      }
    } catch (err: any) {
      console.log("err", err);
      enqueueSnackbar(err?.response?.data?.message, {
        variant: "error",
      });
    }
  };

  return (
    <>
      <Form
        keyIndex={keyIndex}
        inputArray={inputArray}
        formstate={formstate}
        setFormstate={setFormstate}
        error={error}
        messageObj={messageObj}
        handleSubmit={handleSubmit}
        title="Funding"
      />
    </>
  );
};

export default Funding;
