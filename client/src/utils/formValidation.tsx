import React, { useState, ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Typography,
  TextareaAutosize,
} from "@mui/material";

import Select, { SelectChangeEvent } from "@mui/material/Select";

export interface inputType {
  name: string;
  value?: any;
  type: string;
  outputName?: string;
  placeholder?: string;
  options?: any[];
  optionMode?: string;
  disabled?: boolean;
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

const BoxWrapper = ({ children }: { children: React.ReactNode }) => (
  <Box>{children}</Box>
);
const GridWrapper = ({ children }: { children: React.ReactNode }) => (
  <Grid xs={12} md={6} sx={{ paddingLeft: "10px", paddingRight: "10px" }}>
    {children}
  </Grid>
);

export const presentForm = (
  inputArray: inputType[],
  formstate: any,
  setFormstate: any,
  errorState: any,
  message: any,
  type: string = "box"
) => {
  let Wrapper = type === "box" ? BoxWrapper : GridWrapper;

  let comp = inputArray.map((el: inputType, idx: number) => {
    switch (el.type) {
      case "text":
      case "email":
      case "password":
      case "date":
      case "number":
      case "textarea":
        return (
          <Wrapper key={`${idx}C`}>
            <Typography style={{ fontWeight: "bold", fontSize: "0.8em" }}>
              {el?.placeholder?.toUpperCase()}
            </Typography>
            <TextField
              type={el.type}
              margin="normal"
              required
              fullWidth
              multiline={el?.type === "textarea"}
              minRows={3}
              // label={el.placeholder}
              disabled={el.disabled}
              sx={{
                borderColor: errorState[el.name] && "red",
                marginTop: "1px",
              }}
              inputProps={{
                step: el.type === "number" && "2",
                sx: { paddingTop: "12px", paddingBottom: "12px" },
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
          </Wrapper>
        );
      case "select":
        return (
          <Wrapper key={`${idx}C`}>
            <FormControl
              sx={{ mt: type === "box" ? 1 : undefined, width: "100%" }}
            >
              <Typography style={{ fontWeight: "bold", fontSize: "0.8em" }}>
                {el?.placeholder?.toUpperCase()}
              </Typography>
              {/* <InputLabel htmlFor={el.name}>{el.placeholder}</InputLabel> */}
              <Select
                value={formstate[el.name]}
                onChange={(e: SelectChangeEvent) =>
                  setFormstate({ ...formstate, [el.name]: e.target.value })
                }
                inputProps={{
                  sx: { paddingTop: "12px", paddingBottom: "12px" },
                }}
              >
                {el.options instanceof Array &&
                  el.options.map((item: any, nidx: number) => {
                    let label = typeof item === "string" ? item : item?.label;
                    let value = typeof item === "string" ? item : item?.value;
                    return (
                      <MenuItem key={`${nidx}U`} value={value}>
                        {label}
                      </MenuItem>
                    );
                  })}
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
          </Wrapper>
        );
    }
  });
  return comp;
};
