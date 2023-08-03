import React, { useState, ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
} from "@mui/material";
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
export const validateForm = (
  arr: inputType[],
  formstate: any,
  setError: any,
  setMessageObj: any
) => {
  let valid = true;
  let message: outputType = {};
  let error: outputType = {};
  for (let el of arr) {
    let value = formstate[el.name];
    switch (el.type) {
      case "email":
        if (!value || String(value).trim() === "") {
          error[el.name] = true;
          message[el.name] = el?.outputName
            ? `${el?.outputName} field is blank `
            : "Empty field";
          valid = false;
        } else if (
          !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
        ) {
          error[el.name] = true;
          message[el.name] = el?.outputName
            ? `${el?.outputName}  is invalid`
            : "Invalid email address";
          valid = false;
        }
        break;
      default:
        if (!value || String(value).trim() === "") {
          error[el.name] = true;
          message[el.name] = el?.outputName
            ? `${el?.outputName} field is blank`
            : "Empty field";
          valid = false;
        }
    }
  }
  setError(error);
  setMessageObj(message);
  return valid;
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
          <Box key={`${idx}C`}>
            <Typography style={{ fontWeight: "bold", fontSize: "0.8em" }}>
              {el.name.toUpperCase()}
            </Typography>
            <TextField
              type={el.type}
              margin="normal"
              required
              fullWidth
              // label={el.placeholder}
              sx={{
                borderColor: errorState[el.name] && "red",
                marginTop: "1px",
              }}
              autoComplete="off"
              // autoFocus={idx === 0}
              value={formstate[el.name]}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFormstate({ ...formstate, [el.name]: e.target.value })
              }
            />
            {errorState[el.name] && message[el.name] && (
              <FormHelperText
                style={{ width: "100%", marginTop: -10, fontSize: 10 }}
                error
              >
                {message[el.name]}
              </FormHelperText>
            )}
          </Box>
        );
      case "select":
        return (
          <Box key={`${idx}C`}>
            <FormControl sx={{ mt: 1, width: "100%" }}>
              <Typography style={{ fontWeight: "bold", fontSize: "0.8em" }}>
                {el.name.toUpperCase()}
              </Typography>
              {/* <InputLabel htmlFor={el.name}>{el.placeholder}</InputLabel> */}
              <Select
                value={formstate[el.name]}
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
                <FormHelperText
                  style={{
                    width: "100%",
                    marginLeft: 0,

                    fontSize: 10,
                  }}
                  error
                >
                  {message[el.name]}
                </FormHelperText>
              )}
            </FormControl>
          </Box>
        );
    }
  });
  return comp;
};
