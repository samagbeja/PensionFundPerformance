"use client";
import { inputType } from "@/utils/formValidation";
import { useState } from "react";

import type { NextPage } from "next";
import type { Metadata } from "next";
import Form from "@/components/form";

export const metadata: Metadata = {
  title: "Pension-Booking",
  description: "Pension Systems",
};

const Booking: NextPage = () => {
  const [formstate, setFormstate] = useState({} as any);
  const [error, setError] = useState({} as any);
  const [messageObj, setMessageObj] = useState({} as any);
  const inputArray: inputType[] = [
    {
      name: "fundName",
      type: "select",
      outputName: "Fund Name",
      placeholder: "Fund Name",
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
    },
    {
      name: "investmentSector",
      type: "select",
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
  const handleSubmit = () => {};

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
      />
    </>
  );
};

export default Booking;
