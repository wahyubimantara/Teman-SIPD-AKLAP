import "./card.scss";
import * as React from "react";
import "react-circular-progressbar/dist/styles.css";
import { Autocomplete, Box, Button, Grid, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ApprovalIcon from "@mui/icons-material/Approval";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import axios from "../../service/axios";
import { useFormik } from "formik";

const Nomenklatur = [
  { label: "Akun", level: "1" },
  { label: "Kelompok", level: "2" },
  { label: "Jenis", level: "3" },
  { label: "Objek", level: "4" },
  { label: "Rincian Objek", level: "5" },
  { label: "Sub Rincian Objek", level: "6 " },
];

// styling Autocomplete
const StyledAutocomplete = styled(Autocomplete)({
  "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
    // Default transform is "translate(14px, 20px) scale(1)""
    // This lines up the label with the initial cursor position in the input
    // after changing its padding-left.
    transform: "translate(14px, 20px) scale(1);",
    color: "#008000;",
  },
  "& .MuiAutocomplete-inputRoot": {
    color: "purple",
    // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
      // Default left padding is 6px
      paddingLeft: 6,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(224, 224, 224, 1)",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "blue",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "purple",
    },
  },
});

// styling DatePicker
const StyledDatePicker = styled(DatePicker)({
  "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
    // Default transform is "translate(14px, 20px) scale(1)""
    // This lines up the label with the initial cursor position in the input
    // after changing its padding-left.
    transform: "translate(14px, 20px) scale(1);",
    color: "#008000;",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(224, 224, 224, 1)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "blue",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "purple",
  },
});

function Card() {
  const [SKPD, setSKPD] = useState([]);
  const [unitSkpd, setunitSkpd] = useState([]);

  useEffect(() => {
    axios.get("skpd").then((response) => {
      let skpds = response.data.data.map((v) => {
        return { label: v.skpd, key: v.kodeSkpd };
      });
      setSKPD(skpds);
    });

    axios.get("unitSkpd").then((response) => {
      let unitSkpds = response.data.data.map((v) => {
        return { label: v.unitSkpd, key: v.kodeUnitSkpd };
      });
      setunitSkpd(unitSkpds);
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      skpd: "",
      unit: "",
      nomenklatur: "",
      tanggal_mulai: new Date(),
      tanggal_selesai: new Date(),
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="neraca">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <StyledAutocomplete
              disablePortal
              name="skpd"
              id="skpd"
              options={SKPD}
              isOptionEqualToValue={(option, value) => option.key === value.key}
              getOptionLabel={(option) => `${option.key} - ${option.label}`}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  {option.key} - {option.label}
                </Box>
              )}
              onChange={(e, value) => {
                formik.setFieldValue("skpd", value ? `${value.key}` : "");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="SKPD"
                  onChange={formik.handleChange}
                />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <StyledAutocomplete
              disablePortal
              name="unit"
              id="unit"
              options={unitSkpd}
              isOptionEqualToValue={(option, value) => option.key === value.key}
              getOptionLabel={(option) => `${option.key} - ${option.label}`}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  {option.key} - {option.label}
                </Box>
              )}
              onChange={(e, value) => {
                formik.setFieldValue("unit", value ? `${value.key}` : "");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Unit SKPD"
                  onChange={formik.handleChange}
                />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <StyledAutocomplete
              disablePortal
              id="nomenklatur"
              name="nomenklatur"
              options={Nomenklatur}
              isOptionEqualToValue={(option, value) =>
                option.level === value.level
              }
              getOptionLabel={(option) => `${option.level} - ${option.label}`}
              onChange={(e, value) => {
                formik.setFieldValue(
                  "nomenklatur",
                  value ? `${value.label}` : ""
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Klasifikasi, Kodefikasi dan Nomenklatur Rekening"
                  onChange={formik.handleChange}
                />
              )}
            />
          </Grid>
          <Grid item xs={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StyledDatePicker
                value={formik.values?.tanggal_mulai}
                onChange={(value) =>
                  formik.setFieldValue("tanggal_mulai", value.format("YYYY-MM-DD"))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{ svg: { color: "#008000;" } }}
                    label="Mulai"
                    name="tanggal_mulai"
                    onChange={formik.handleChange}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StyledDatePicker
                value={formik.values?.tanggal_selesai}
                onChange={(value) =>
                  formik.setFieldValue("tanggal_selesai", value.format("YYYY-MM-DD"))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{ svg: { color: "#008000;" } }}
                    label="Selesai"
                    name="tanggal_selesai"
                    onChange={formik.handleChange}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={4}>
            <Button
              sx={{ float: "left" }}
              variant="outlined"
              type="submit"
              startIcon={<ApprovalIcon />}
            >
              Terapkan
            </Button>
            <Button
              sx={{ "margin-left": 10, float: "left" }}
              variant="contained"
              endIcon={<CloudDownloadIcon />}
            >
              Excell
            </Button>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </form>
    </div>
  );
}

export default Card;
