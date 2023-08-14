"use client";
import { useCallback, useMemo, useState, FormEvent, useEffect } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";

import Table from "./tab";
import Search from "./search";
import Modal from "../Modal";
import Form from "../form";

const now = new Date();

const FullTable = ({
  data,
  tableHeaders,
  title,
  inputArray,
  formstate,
  setFormstate,
  error,
  setError,
  setMessageObj,
  setKeyIndex,
  messageObj,
  keyIndex,
  handleSubmit,
  handleEditForm,
  handleDeleteForm,
}: any) => {
  console.log(data, "itemdata");

  const [open, setOpen] = useState(false);
  const [formType, setFormType] = useState(1);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleClose = () => setOpen(false);

  const handlePageChange = useCallback((event: any, value: number) => {
    setPage(value);
  }, []);
  const handleRowsPerPageChange = useCallback((event: any) => {
    setRowsPerPage(event.target.value);
  }, []);
  const applyPagination = () => {
    return data instanceof Array
      ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : [];
  };

  const handleEdit = (item: any) => {
    setFormType(2);
    setOpen(true);

    setFormstate(item);
  };

  const handleDelete = (item: any) => {
    setFormType(3);
    setOpen(true);
    setFormstate(item);
  };

  const BodyTag = () => {
    switch (formType) {
      case 2:
        return (
          <Form
            keyIndex={keyIndex}
            inputArray={inputArray}
            formstate={formstate}
            setFormstate={setFormstate}
            error={error}
            messageObj={messageObj}
            handleSubmit={handleEditForm}
            title={`Edit ${title} record of ${formstate[tableHeaders[0]?.id]}`}
            handleClose={handleClose}
            edt
          />
        );
      case 3:
        return (
          <Box
            component="main"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Card style={{ marginLeft: "10px", borderRadius: "5px" }}>
              <CardContent>
                Do you want to delete {formstate[tableHeaders[0]?.id]}
                <Box
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button onClick={() => handleDeleteForm()}>Yes</Button>
                  <Button onClick={() => setOpen(false)}>No</Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        );
      default:
        return (
          <Form
            keyIndex={keyIndex}
            inputArray={inputArray}
            formstate={formstate}
            setFormstate={setFormstate}
            error={error}
            messageObj={messageObj}
            handleSubmit={handleSubmit}
            title={`Add to ${title}`}
            handleClose={handleClose}
          />
        );
    }
  };

  useEffect(() => {
    setOpen(false);
  }, [keyIndex]);

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">{title}</Typography>
                {/* <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Export
                  </Button>
                </Stack> */}
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={() => {
                    setFormType(1);
                    setFormstate({});
                    setError({});
                    setOpen(true);
                  }}
                >
                  Add
                </Button>
              </div>
            </Stack>
            {/* <Search title={title} /> */}
            <Table
              count={data.length}
              items={applyPagination()}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              tableHeaders={tableHeaders}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </Stack>
        </Container>
      </Box>
      <Modal open={open} handleClose={handleClose}>
        {BodyTag()}
      </Modal>
    </>
  );
};

export default FullTable;
