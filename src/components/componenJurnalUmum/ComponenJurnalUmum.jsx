import "./componenjurnalumum.scss";
import * as React from "react";
import "react-circular-progressbar/dist/styles.css";
import { Autocomplete, Box, Button, Grid, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddTaskIcon from '@mui/icons-material/AddTask';

import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import axios from "../../service/axios";
import { useFormik } from "formik";

const Jenis_Jurnal = [
  { label: "Jurnal Penerimaan Kas", kode: "1" },
  { label: "Jurnal Pengeluaran Kas", kode: "2" },
  { label: "Jurnal Umum - Penyesuaian", kode: "3" },
  { label: "Jurnal Umum - Koreksi", kode: "4" },
  { label: "Jurnal Umum -  Korolari", kode: "5" },
  { label: "Jurnal Umum - Balik", kode: "6" },
  { label: "Jurnal Umum - Penutup", kode: "7" },
];

const Kode_Rekening = [
  { label: "Kas di Kas Derah", kode_rekening: "1.1.01.01.01.0001" },
  { label: "Kas di Bendahara Penerimaan", kode_rekening: "1.1.01.02.01.0001" },
  { label: "Kas di Bendahara Pengeluaran", kode_rekening: "1.1.01.03.01.0001" },
  { label: "Kas BLUD", kode_rekening: "1.1.01.04.01.0001" },
  { label: "Kas Dana Bos", kode_rekening: "1.1.01.05.01.0001" },
  { label: "Kas Dana Kapitasi pada FKTP", kode_rekening: "1.1.01.06.01.0001" },
  { label: "Kas Lainnya ", kode_rekening: "1.1.01.07.01.0001" },
  { label: "Setara Kas ", kode_rekening: "1.1.01.08.01.0001" },
  { label: "Kas Dana Desa ", kode_rekening: "1.1.01.09.01.0001" },
  { label: "Investasi Dalam Saham ", kode_rekening: "1.1.02.01.01.0001" }
];
// styling Textfield
const StyledTextField = styled(TextField)({
  "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
    // Default transform is "translate(14px, 20px) scale(1)""
    // This lines up the label with the initial cursor position in the input
    // after changing its padding-left.
    transform: "translate(14px, 20px) scale(1);",
    color: "#008000;",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(224, 224, 224, 1);",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "blue",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "purple",
  },
});

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

function ComponenJurnalUmum() {
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
      jenis_jurnal: "",
      nomor_jurnal: "",
      tanggal_jurnal: new Date(),
      nomor_dokumen_sumber: "",
      tanggal_dokumen_sumber: new Date(),
      keterangan: "",
      kode_rekening:"",
      debit:"",
      kredit:""
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="componenjurnalumum">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={6}>
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
            <StyledTextField
              fullWidth
              id="nomor_jurnal"
              label="Nomor Jurnal"
              name="nomor_jurnal"
              value={formik.values.nomor_jurnal}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StyledDatePicker
                value={formik.values?.tanggal_jurnal}
                onChange={(value) =>
                  formik.setFieldValue(
                    "tanggal_jurnal",
                    value.format("YYYY-MM-DD")
                  )
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{ svg: { color: "#008000;" } }}
                    label="Tanggal Jurnal"
                    name="tanggal_jurnal"
                    onChange={formik.handleChange}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={6}>
            <StyledTextField
              fullWidth
              id="nomor_dokumen_sumber"
              label="Nomor Dokumen Sumber"
              name="nomor_dokumen_sumber"
              value={formik.values.nomor_dokumen_sumber}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StyledDatePicker
                value={formik.values?.tanggal_dokumen_sumber}
                onChange={(value) =>
                  formik.setFieldValue(
                    "tanggal_dokumen_sumber",
                    value.format("YYYY-MM-DD")
                  )
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{ svg: { color: "#008000;" } }}
                    label="Tanggal Dokumen Sumber"
                    name="tanggal_dokumen_sumber"
                    onChange={formik.handleChange}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={6}>
            <StyledAutocomplete
              disablePortal
              id="jenis_jurnal"
              name="jenis_jurnal"
              options={Jenis_Jurnal}
              isOptionEqualToValue={(option, value) =>
                option.kode === value.kode
              }
              getOptionLabel={(option) => `${option.kode} - ${option.label}`}
              onChange={(e, value) => {
                formik.setFieldValue(
                  "jenis_jurnal",
                  value ? `${value.kode}` : ""
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Jenis Jurnal"
                  onChange={formik.handleChange}
                />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <StyledTextField
              fullWidth
              id="keterangan"
              label="Keterangan"
              name="keterangan"
              value={formik.values.keterangan}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <StyledAutocomplete
              disablePortal
              id="kode_rekening"
              name="kode_rekening"
              options={Kode_Rekening}
              isOptionEqualToValue={(option, value) =>
                option.kode_rekening === value.kode_rekening
              }
              getOptionLabel={(option) => `${option.kode_rekening} - ${option.label}`}
              onChange={(e, value) => {
                formik.setFieldValue(
                  "kode_rekening",
                  value ? `${value.kode_rekening}` : ""
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Kode Rekening"
                  onChange={formik.handleChange}
                />
              )}
            />
          </Grid>

          <Grid item xs={3}>
            <StyledTextField
              fullWidth
              id="debit"
              label="Debit"
              name="debit"
              value={formik.values.debit}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={3}>
            <StyledTextField
              fullWidth
              id="kredit"
              label="Kredit"
              name="kredit"
              value={formik.values.kredit}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={12}>
          <Button
            variant="contained"
            type="submit"
            endIcon={<AddTaskIcon />}
          >
            Tambah Jurnal
          </Button>
        </Grid>

        </Grid>
      </form>
    </div>
  );
}

export default ComponenJurnalUmum;
