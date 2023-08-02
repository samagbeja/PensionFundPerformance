import React, { useState, ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export interface inputType {
  name: string;
  value?: any;
  type: string;
  outputName?: string;
  placeholder?: string;
  options?: any[];
}
interface outputType {
  [key: string]: boolean | string;
}
export const validateForm = (arr: inputType[]) => {
  let valid = true;
  let message: outputType = {};
  let error: outputType = {};
  for (let el of arr) {
    switch (el.type) {
      case "email":
        if (!el.value || String(el.value).trim() === "") {
          error[el.name] = true;
          message[el.name] = el?.outputName
            ? `${el?.outputName} field is blank `
            : "Empty field";
          valid = false;
        } else if (
          !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(el.value)
        ) {
          error[el.name] = true;
          message[el.name] = el?.outputName
            ? `${el?.outputName}  is invalid`
            : "Invalid email address";
          valid = false;
        }
        break;
      default:
        if (!el.value || String(el.value).trim() === "") {
          error[el.name] = true;
          message[el.name] = el?.outputName
            ? `${el?.outputName} field is blank`
            : "Empty field";
          valid = false;
        }
    }
  }

  return { valid, message, error };
};

export const presentForm = (
  inputArray: inputType[],
  formstate: any,
  setFormstate: any,
  errorState: any,
  message: any
) => {
  let comp = inputArray.map((el: inputType, idx: number) => {
    switch (el.type) {
      case "text":
      case "email":
      case "password":
        return (
          <React.Fragment key={`${idx}C`}>
            <TextField
              type={el.type}
              margin="normal"
              required
              fullWidth
              label={el.placeholder}
              name={el.name}
              sx={{ borderColor: errorState[el.name] && "red" }}
              autoComplete="off"
              autoFocus
              value={formstate[el.name]}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFormstate({ ...formstate, [el.name]: e.target.value })
              }
            />
            {errorState[el.name] && message[el.name] && (
              <FormHelperText variant="error">
                {message[el.name]}
              </FormHelperText>
            )}
          </React.Fragment>
        );
      case "select":
        return (
          <React.Fragment key={`${idx}C`}>
            <FormControl sx={{ mt: 1, width: "100%" }}>
              <InputLabel id="userType_label">{el.placeholder}</InputLabel>
              <Select
                labelId="userType_label"
                id="userType_helper"
                value={formstate[el.name]}
                label="Age"
                onChange={(e: SelectChangeEvent) =>
                  setFormstate({ ...formstate, [el.name]: e.target.value })
                }
              >
                {el.options &&
                  el.options.map((item: string, nidx: number) => (
                    <MenuItem key={`${nidx}U`} value={item}>
                      {item}
                    </MenuItem>
                  ))}
              </Select>
              {errorState[el.name] && message[el.name] && (
                <FormHelperText variant="error">
                  {message[el.name]}
                </FormHelperText>
              )}
            </FormControl>
          </React.Fragment>
        );
    }
  });
  return comp;
};
