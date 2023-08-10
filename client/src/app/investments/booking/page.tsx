"use client";
import { inputType, validateForm } from "@/utils/formValidation";
import { useState, useEffect, FormEvent } from "react";

import type { NextPage } from "next";
import type { Metadata } from "next";
import api from "@/utils/api";
import Form from "@/components/form";
import { useSnackbar } from "notistack";

export const metadata: Metadata = {
  title: "Pension-Booking",
  description: "Pension Systems",
};

const Booking: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formstate, setFormstate] = useState({} as any);
  const [error, setError] = useState({} as any);
  const [messageObj, setMessageObj] = useState({} as any);
  const [keyIndex, setKeyIndex] = useState(1);
  const [fundData, setFundData] = useState({} as any);

  const getFundData = async () => {
    try {
      const res: any = await api.get("fund");
      if (res?.data?.payload instanceof Array) {
        let data = res?.data?.payload.map((el: any) => ({
          value: el.fundId,
          label: el.fundName,
        }));
        setFundData(data);
      }
    } catch {
      return [];
    }
  };

  useEffect(() => {
    getFundData();
  }, []);
  const inputArray: inputType[] = [
    {
      name: "fundId",
      type: "select",
      outputName: "Fund Name",
      placeholder: "Fund Name",
      options: fundData,
      optionMode: "labelValue",
    },
    {
      name: "investmentName",
      type: "text",
      outputName: "Investment Name",
      placeholder: "Investment Name",
    },

    {
      name: "investmentType",
      type: "select",
      outputName: "Investment Type",
      placeholder: "Investment Type",
      options: ["Full"],
    },
    {
      name: "investmentSector",
      type: "select",
      outputName: "Investment Sector",
      placeholder: "Investment Sector",
      options: ["Industry"],
    },
    {
      name: "investmentAmount",
      type: "number",
      outputName: "Investment Amount",
      placeholder: "Investment Amount",
    },

    {
      name: "investmentStartDate",
      type: "date",
      outputName: "Start Date",
      placeholder: "Start Date",
    },
    {
      name: "investmentEndDate",
      type: "date",
      outputName: "End Date",
      placeholder: "End Date",
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

        const res: any = await api.post("investment", formstate);
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
        inputArray={inputArray}
        formstate={formstate}
        setFormstate={setFormstate}
        error={error}
        messageObj={messageObj}
        handleSubmit={handleSubmit}
        title="Funding"
        keyIndex={keyIndex}
      />
    </>
  );
};

export default Booking;
