import Page from "src/components/Page";
import { Chart as ChartJS } from "chart.js/auto";
import {
  Container,
  Grid,
  Card,
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  FormGroup,
  Stack,
  IconButton,
  ButtonGroup,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";
import BarchartComponent from "./BarchartComponent";
import { useForm, useFieldArray } from "react-hook-form";

import { useRef, useReducer } from "react";
import reducer, { initState } from "./Reducer";
import {
  setHandleDialog,
  setInputTitleCollumn,
  setTitleCollumn,
  deleteCollumn,
  submitChart,
} from "./Actions";

// routes
import { PATH_DASHBOARD } from "src/routes/paths";
// hooks
import useSettings from "../../../../../hooks/useSettings";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";

const BarChart = () => {
  const { themeStretch } = useSettings();

  //reducer
  const [state, dispatch] = useReducer(reducer, initState);
  const { handleDialog, inputCollumn, titleCollumn, dataOfChart } = state;
  const inputCollumnRef = useRef();

  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      items: [{ value: "" }, { value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const handleClickOpen = () => {
    dispatch(setHandleDialog(true));
  };
  const handleClose = () => {
    dispatch(setHandleDialog(false));
  };
  const hanldleSubmitLiaLog = () => {
    dispatch(setTitleCollumn(inputCollumn));

    append({
      value: "",
    });
    dispatch(setHandleDialog(false));
    dispatch(setInputTitleCollumn(""));
  };
  const handleRemove = (index) => {
    remove(index);
    dispatch(deleteCollumn(index));
  };
  const onSubmit = (data) => {
    dispatch(submitChart(data.items));
  };

  //nhan phim enter de submit
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      hanldleSubmitLiaLog();
    }
  };
  return (
    <Page title="Bi???u ????? C???t">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="Bi???u ????? C???t"
          links={[
            {
              name: "Th???ng k?? v?? X??c su???t",
              href: PATH_DASHBOARD.thongKeVaXacSuat.root,
            },
            {
              name: "Bi???u ?????",
              href: PATH_DASHBOARD.thongKeVaXacSuat.bieuDo.root,
            },
            { name: "Bi???u ????? C???t" },
          ]}
        />
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                gap: 5,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  columnGap: 1,
                  rowGap: 1,
                }}
              >
                <Dialog
                  open={handleDialog}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle>th??m t??n c???t</DialogTitle>
                  <DialogContent style={{ alignItems: "center" }}>
                    <Stack mt={5}>
                      <TextField
                        label={`T??n c???t`}
                        focused
                        value={inputCollumn}
                        ref={inputCollumnRef}
                        onChange={(e) =>
                          dispatch(setInputTitleCollumn(e.target.value))
                        }
                        onKeyPress={(e) => handleKeyPress(e)}
                        autoFocus
                        autoComplete="false"
                      />
                    </Stack>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Tho??t</Button>
                    <Button onClick={hanldleSubmitLiaLog}>?????ng ??</Button>
                  </DialogActions>
                </Dialog>
                <Stack flexDirection={"row"} justifyContent={"space-between"}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleClickOpen}
                  >
                    Th??m C???t
                  </Button>
                </Stack>
                <FormGroup
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    margin: "10px 0",
                  }}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {fields.map(({ id }, index) => (
                    <Stack
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                      key={id}
                    >
                      <TextField
                        {...register(`items.${index}.value`, {
                          required: true,
                        })}
                        label={titleCollumn[index]}
                        type="number"
                        autoComplete="false"
                        focused
                        autoFocus
                        size="small"
                        // onChange={(e) => setInputVal4(e.target.value)}
                        style={{ flex: 5 }}
                      />
                      <ButtonGroup orientation="horizontal" variant="text">
                        <IconButton
                          onClick={() => handleRemove(index)}
                          style={{ cursor: "pointer", flex: 1 }}
                        >
                          <CloseIcon />
                        </IconButton>
                        <IconButton>
                          <SettingsIcon />
                        </IconButton>
                      </ButtonGroup>
                    </Stack>
                  ))}
                </FormGroup>
                <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                  X??c nh???n
                </Button>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={8} style={{ width: 500 }}>
            <Card sx={{ p: 3 }}>
              <BarchartComponent chartData={dataOfChart} />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default BarChart;
