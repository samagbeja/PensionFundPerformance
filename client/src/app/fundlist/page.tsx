"use client";
import { inputType, validateForm } from "@/utils/formValidation";
import { useState, FormEvent, useEffect } from "react";

import type { NextPage } from "next";
import type { Metadata } from "next";
import Form from "@/components/form";
import api from "@/utils/api";
import { useSnackbar } from "notistack";

import FullTable from "@/components/FullTable";
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
    { id: "fundStartDate", title: "Start Date" },
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
      options: ["Active", "Inactive"],
    },
  ];

  console.log(formstate, "formstate");

  const handleSubmit = async (e: FormEvent<any>) => {
    try {
      e.preventDefault();

      let status = validateForm(inputArray, formstate, setError, setMessageObj);
      console.log(status);
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
        await getFundData();
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

  const getFundData = async () => {
    try {
      const res: any = await api.get("fund");
      if (res?.data?.payload instanceof Array) {
        let data = res?.data?.payload.map((el: any) => {
          el.fundStartDate = new Date(el.fundStartDate).toLocaleDateString(
            "en-GB"
          );
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
        submitForm={handleSubmit}
        formstate={formstate}
        setFormstate={setFormstate}
        error={error}
        setError={setError}
        setMessageObj={setMessageObj}
        setKeyIndex={setKeyIndex}
        messageObj={messageObj}
        keyIndex={keyIndex}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default Funding;
