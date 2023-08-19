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

const Investment: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formstate, setFormstate] = useState({} as any);
  const [error, setError] = useState({} as any);
  const [keyIndex, setKeyIndex] = useState(1);
  const [messageObj, setMessageObj] = useState({} as any);

  const [fundData, setFundData] = useState([] as any);
  const [investmentData, setInvestmentData] = useState([] as any);

  const tableHeaders = [
    { id: "investmentName", title: "Name" },
    { id: "fundName", title: "Fund Name" },
    { id: "investmentType", title: "Type" },
    { id: "investmentSector", title: "Sector" },
    { id: "investmentAmount", title: "Amount" },
    { id: "startDate", title: "Start Date" },
    { id: "endDate", title: "End Date" },
  ];

  const inputArray: inputType[] = [
    {
      name: "investmentName",
      type: "text",
      outputName: "Investment Name",
      placeholder: "Investment Name",
    },
    {
      name: "fundId",
      type: "select",
      outputName: "Fund Name",
      placeholder: "Fund Name",
      options: fundData,
      optionMode: "labelValue",
    },

    {
      name: "investmentType",
      type: "select",
      outputName: "Investment Type",
      placeholder: "Investment Type",
      options: [
        "Stocks",
        "Bonds",
        "Real Estate",
        "Fixed Deposit",
        "Discounted Instrument",
      ],
    },
    {
      name: "investmentSector",
      type: "text",
      outputName: "Investment Sector",
      placeholder: "Investment Sector",
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

  console.log(formstate, "formstate");
  const url = "investment";
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
      getInvestMents
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
      getInvestMents
    );

  const handleDeleteForm = async () =>
    handleDelete(
      url,
      formstate,
      enqueueSnackbar,
      setFormstate,
      setError,
      setKeyIndex,
      formstate.fundId,
      getInvestMents
    );

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
      return setFundData([]);
    }
  };

  const getInvestMents = async () => {
    try {
      const res: any = await api.get(url);
      if (res?.data?.payload instanceof Array) {
        let data = res?.data?.payload.map((el: any) => {
          el.startDate = new Date(el.investmentStartDate).toLocaleDateString(
            "en-GB"
          );
          el.endDate = new Date(el.investmentEndDate).toLocaleDateString(
            "en-GB"
          );
          el.investmentStartDate = String(el.investmentStartDate).split("T")[0];
          el.investmentEndDate = String(el.investmentEndDate).split("T")[0];

          return el;
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
    await getFundData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <FullTable
        title="Investment List"
        tableHeaders={tableHeaders}
        data={investmentData}
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

export default Investment;
