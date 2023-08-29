import { Box } from "@mui/material";
import Table from "../FullTable/tab";

import { useState, useCallback } from "react";

export default ({ data, tableHeaders, title }: any) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
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
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItem: "center",
        flexDirection: "column",
      }}
    >
      <Box>{title}</Box>
      <Table
        count={data.length}
        items={applyPagination()}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        tableHeaders={tableHeaders}
        noAction
      />
    </Box>
  );
};
