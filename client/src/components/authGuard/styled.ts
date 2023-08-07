import { Box } from "@mui/material";
import styled from "@emotion/styled";

export const LayoutContainer = styled(Box)({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
});

export const SIDE_NAV_WIDTH = 280;

export const LayoutRoot = styled(Box)(({ theme }: any) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));
