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

const Funding: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formstate, setFormstate] = useState({} as any);
  const [error, setError] = useState({} as any);
  const [keyIndex, setKeyIndex] = useState(1);
  const [messageObj, setMessageObj] = useState({} as any);

  const [fundData, setFundData] = useState([] as any);

  const tableHeaders = [
    { id: "fundName", title: "Fund Name" },
    { id: "fundType", title: "Fund Type" },
    { id: "fundAssets", title: "Fund Assets" },
    { id: "startDate", title: "Start Date" },
    { id: "status", title: "Status" },
  ];

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
      options: ["Defined benefit", "Defined contribution"],
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
      options: ["Active", "Inactive"],
    },
  ];

  console.log(formstate, "formstate");

  const handleSubmitForm = async (e: FormEvent<any>) =>
    handleSubmit(
      e,
      enqueueSnackbar,
      "fund",
      inputArray,
      formstate,
      setError,
      setKeyIndex,
      setFormstate,
      setMessageObj,
      getFundData
    );

  const handleEditForm = async (e: FormEvent<any>) =>
    handleEdit(
      e,
      enqueueSnackbar,
      "fund",
      inputArray,
      formstate,
      setError,
      setKeyIndex,
      setFormstate,
      setMessageObj,
      getFundData
    );

  const handleDeleteForm = async () =>
    handleDelete(
      "fund",
      formstate,
      enqueueSnackbar,
      setFormstate,
      setError,
      setKeyIndex,
      formstate.fundId,
      getFundData
    );

  const getFundData = async () => {
    try {
      const res: any = await api.get("fund");
      if (res?.data?.payload instanceof Array) {
        let data = res?.data?.payload.map((el: any) => {
          el.startDate = new Date(el.fundStartDate).toLocaleDateString("en-GB");
          el.fundStartDate = String(el.fundStartDate).split("T")[0];

          return el;
        });

        setFundData(data);
      } else {
        setFundData([]);
      }
    } catch {
      setFundData([]);
    }
  };

  useEffect(() => {
    getFundData();
  }, []);

  return (
    <>
      <FullTable
        title="Fund List"
        tableHeaders={tableHeaders}
        data={fundData}
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

export default Funding;
