"use client";
import { format } from "date-fns";
import React from "react";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  SvgIcon,
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
import TrashIcon from "@heroicons/react/24/solid/TrashIcon";
import PencilIcon from "@heroicons/react/24/solid/PencilSquareIcon";

export default (props: any) => {
  const {
    count = 0,
    items = [],
    tableHeaders = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    handleEdit,
    handleDelete,
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
              {tableHeaders.length && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item: any, index: number) => {
              return (
                <TableRow hover key={`C${index}`}>
                  {tableHeaders.map((citem: any, idx: number) => (
                    <TableCell key={`HC${idx}`}>{item[citem?.id]}</TableCell>
                  ))}
                  {tableHeaders.length && (
                    <TableCell
                      style={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      <span
                        onClick={() => handleEdit(item)}
                        title="Edit"
                        style={{ marginRight: 10, cursor: "pointer" }}
                      >
                        <SvgIcon fontSize="small" color="primary">
                          <PencilIcon />
                        </SvgIcon>
                      </span>
                      <span
                        onClick={() => handleDelete(item)}
                        style={{ cursor: "pointer" }}
                        title="Delete"
                      >
                        <SvgIcon fontSize="small" color="error">
                          <TrashIcon />
                        </SvgIcon>
                      </span>
                    </TableCell>
                  )}
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
