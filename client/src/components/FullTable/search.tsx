import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";

export default ({ title }: any) => (
  <Card sx={{ p: 2, justifyContent: "flex-end", display: "flex" }}>
    <OutlinedInput
      defaultValue=""
      // fullWidth

      // placeholder={`Search ${title}`}
      placeholder={`Search`}
      startAdornment={
        <InputAdornment position="start">
          <SvgIcon color="action" fontSize="small">
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      }
      sx={{ maxWidth: 500, width: "20%", minWidth: "300px" }}
    />
  </Card>
);
