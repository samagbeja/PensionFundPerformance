import { presentForm } from "@/utils/formValidation";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
} from "@mui/material";

export default ({
  inputArray,
  formstate,
  setFormstate,
  error,
  messageObj,
  handleSubmit,
  keyIndex,
  title,
  handleClose,
}: any) => {
  console.log(keyIndex, "keyIndex");
  return (
    <>
      <Box
        component="main"
        sx={
          {
            // flexGrow: 1,
            // py: 1,
          }
        }
        key={keyIndex}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3} style={{ gap: "20px" }}>
            {/* <Grid xs={12}>
              <Card style={{ marginLeft: "10px", borderRadius: "5px" }}>
                <CardContent style={{ padding: "10px" }}>{title}</CardContent>
              </Card>
            </Grid> */}
            <Grid xs={12}>
              <Card style={{ marginLeft: "10px", borderRadius: "5px" }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      px: 2,
                      marginTop: "-10px",
                      // pl: 5,
                      borderBottom: "1px solid #ccc",
                    }}
                  >
                    <Box>{title}</Box>
                    <Box
                      onClick={handleClose}
                      style={{ fontSize: 20, cursor: "pointer" }}
                    >
                      X
                    </Box>
                  </Box>
                  <Grid
                    container
                    spacing={2}
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1, p: 4, pl: 5 }}
                  >
                    {presentForm(
                      inputArray,
                      formstate,
                      setFormstate,
                      error,
                      messageObj,
                      "grid"
                    )}

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Submit
                    </Button>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
