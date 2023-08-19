import { validateForm } from "./formValidation";
import { FormEvent } from "react";
import api from "./api";
import React from "react";

export const handleSubmit = async (
  e: FormEvent<any>,
  enqueueSnackbar: any,
  url: string,
  inputArray: any,
  formstate: any,
  setError: any,
  setKeyIndex: any,
  setFormstate: any,
  setMessageObj: any,
  otherFunction: any,
  edt = false
) => {
  try {
    e.preventDefault();

    let status = validateForm(inputArray, formstate, setError, setMessageObj);
    console.log(status);
    if (status) {
      // sign up

      const res: any = edt
        ? await api.put(url, formstate)
        : await api.post(url, formstate);
      console.log(res, "res");
      enqueueSnackbar(res?.data?.message, {
        variant: "success",
      });
      setFormstate({});
      setError({});
      setKeyIndex(Math.random());
      await otherFunction();
      // await getFundData();
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

export const handleEdit = async (
  e: FormEvent<any>,
  enqueueSnackbar: any,
  url: string,
  inputArray: any,
  formstate: any,
  setError: any,
  setKeyIndex: any,
  setFormstate: any,
  setMessageObj: any,
  otherFunction: any
) =>
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
    otherFunction,
    true
  );

export const handleDelete = async (
  url: any,
  formstate: any,
  enqueueSnackbar: any,
  setFormstate: any,
  setError: any,
  setKeyIndex: any,
  id: any,
  otherFunction: any
) => {
  try {
    const res: any = await api.delete(`${url}?id=${id}`);

    enqueueSnackbar(res?.data?.message, {
      variant: "success",
    });
    setFormstate({});
    setError({});
    setKeyIndex(Math.random());
    await otherFunction();
  } catch (err: any) {
    console.log("err", err);
    enqueueSnackbar(err?.response?.data?.message, {
      variant: "error",
    });
  }
};
