"use client";
import { format } from "date-fns";
import React from "react";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "../scrollbar";
import _default from "@mui/material/styles/identifier";

export default (props: any) => {
  const {
    count = 0,
    items = [],
    tableHeaders = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;

  console.log(items, "items");

  return (
    <Card>
      {/* <Scrollbar style={{ height: "auto" }}> */}
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeaders.map((item: any, index: number) => (
                <TableCell key={`H${index}`}>{item?.title}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item: any, index: number) => {
              return (
                <TableRow hover key={`C${index}`}>
                  {tableHeaders.map((citem: any, idx: number) => (
                    <TableCell key={`HC${idx}`}>{item[citem?.id]}</TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      {/* </Scrollbar> */}
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
