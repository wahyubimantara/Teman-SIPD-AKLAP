import "./skpd.scss";
import * as React from "react";
import "react-circular-progressbar/dist/styles.css";
import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ApprovalIcon from "@mui/icons-material/Approval";

import { styled } from "@mui/material/styles";
import { useState , useEffect} from "react";
import axios from "../../axios";
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
      borderColor: "rgba(224, 224, 224, 1);",
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
    borderColor: "rgba(224, 224, 224, 1);",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "blue",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "purple",
  },
});

const Nomenklatur = [
  { label: "Level 1. Akun", level: "1" },
  { label: "Level 2. Kelompok", level: "2" },
  { label: "Level 3. Jenis", level: "3" },
  { label: "Level 4. Objek", level: "4" },
  { label: "Level 5. Rincian Objek", level: "5" },
  { label: "Level 6. Sub Rincian Objek", level: "6 "}

];

function SKPD() {
  const [SKPD, setSKPD] = useState([]);
  const [unitSkpd, setunitSkpd] = useState([]);
  const [akun, setAkun] = useState([]);
  const [kelompok, setKelompok] = useState([]);
  const [jenis, setJenis] = useState([]);
  const [objek, setObjek] = useState([]);
  const [rincian_objek, setRincianObjek] = useState([]);
  const [sub_rincian_objek, setSubRincianObjek] = useState([]);

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

    axios.get("rekening?level=1").then((response) => {
      let akuns = response.data.data.map((v) => {
        return { label: v.rekening, key: v.kodeRekening };
      });
      setAkun(akuns);
    });

    axios.get("rekening?level=2").then((response) => {
      let kelompoks = response.data.data.map((v) => {
        return { label: v.rekening, key: v.kodeRekening };
      });
      setKelompok(kelompoks);
    });

    axios.get("rekening?level=3").then((response) => {
      let jeniss = response.data.data.map((v) => {
        return { label: v.rekening, key: v.kodeRekening };
      });
      setJenis(jeniss);
    });

    axios.get("rekening?level=4").then((response) => {
      let objeks = response.data.data.map((v) => {
        return { label: v.rekening, key: v.kodeRekening };
      });
      setObjek(objeks);
    });

    axios.get("rekening?level=5").then((response) => {
      let RincianObjeks = response.data.data.map((v) => {
        return { label: v.rekening, key: v.kodeRekening };
      });
      setRincianObjek(RincianObjeks);
    });

    axios.get("rekening?level=5").then((response) => {
      let SubRincianObjeks = response.data.data.map((v) => {
        return { label: v.rekening, key: v.kodeRekening };
      });
      setSubRincianObjek(SubRincianObjeks);
    });

  }, []);

  // tanggal mulai-selesai
  const [value_mulai, setValue_mulai] = React.useState(null);
  const [value_selesai, setValue_selesai] = React.useState(null);

  // skpd
  const [value_skpd, setValue_skpd] = React.useState(null);
  // unit skpd
  const [value_unitSkpd, setValue_unitSkpd] = React.useState(null);
  // Nomenklatur
  const [value_Nomenklatur, setValue_Nomenklatur] = React.useState(Nomenklatur[5]);
  // akun
  const [value_akun, setValue_akun] = React.useState(null);
  // kelompok
  const [value_kelompok, setValue_kelompok] = React.useState(null);
  // jenis
  const [value_jenis, setValue_jenis] = React.useState(null);
  // objek
  const [value_objek, setValue_objek] = React.useState(null);
  // RincianObjek
  const [value_RincianObjek, setValue_RincianObjek] = React.useState(null);
  // SubRincianObjek
  const [value_SubRincianObjek, setValue_SubRincianObjek] = React.useState(null);
  return (
    <div className="skpd">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <StyledAutocomplete
            disablePortal
            value={value_skpd}
            onChange={(event, newValue) => {
              setValue_skpd(newValue);
              console.log(newValue);
            }}
            id="skpd"
            options={SKPD}
            // sx={4}
            renderInput={(params) => <TextField {...params} label="SKPD" />}
          />
        </Grid>

        <Grid item xs={12}>
          <StyledAutocomplete
            disablePortal
            value={value_unitSkpd}
            onChange={(event, newValue) => {
              setValue_unitSkpd(newValue);
              console.log(newValue);
            }}
            id="unit-skpd"
            options={unitSkpd}
            // sx={4}
            renderInput={(params) => (
              <TextField {...params} label="Unit SKPD" />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <StyledAutocomplete
            disablePortal
            value={value_Nomenklatur}
            onChange={(event, newValue) => {
              setValue_Nomenklatur(newValue);
              console.log(newValue);
            }}
            id="kodefikasi"
            disableClearable
            options={Nomenklatur}
            // sx={4}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Klasifikasi, Kodefikasi dan Nomenklatur Rekening"
              />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <StyledAutocomplete
          
            disablePortal
            value={value_akun}
            onChange={(event, newValue) => {
              setValue_akun(newValue);
              console.log(newValue);
            }}
            id="akun"
            options={akun}
            disabled={value_Nomenklatur.level<"1"}
            renderInput={(params) => <TextField {...params} label="Akun" />}
          />
        </Grid>
        <Grid item xs={6}>
          <StyledAutocomplete
            disablePortal
            value={value_kelompok}
            onChange={(event, newValue) => {
              setValue_kelompok(newValue);
              console.log(newValue);
            }}
            id="kelompok"
            options={kelompok}
            disabled={value_Nomenklatur.level<"2"}
            renderInput={(params) => <TextField {...params} label="Kelompok" />}
          />
        </Grid>

        <Grid item xs={6}>
          <StyledAutocomplete
            disablePortal
            value={value_jenis}
            onChange={(event, newValue) => {
              setValue_jenis(newValue);
              console.log(newValue);
            }}
            id="jenis"
            options={jenis}
            disabled={value_Nomenklatur.level<"3"}
            // sx={4}
            renderInput={(params) => <TextField {...params} label="Jenis" />}
          />
        </Grid>
        <Grid item xs={6}>
          <StyledAutocomplete
            disablePortal
            value={value_objek}
            onChange={(event, newValue) => {
              setValue_objek(newValue);
              console.log(newValue);
            }}
            id="objek"
            options={objek}
            disabled={value_Nomenklatur.level<"4"}
            renderInput={(params) => <TextField {...params} label="Objek" />}
          />
        </Grid>

        <Grid item xs={6}>
          <StyledAutocomplete
            disablePortal
            value={value_RincianObjek}
            onChange={(event, newValue) => {
              setValue_RincianObjek(newValue);
              console.log(newValue);
            }}
            id="RincianObjek"
            options={rincian_objek}
            disabled={value_Nomenklatur.level<"5"}
            renderInput={(params) => (
              <TextField {...params} label="Rincian Objek" />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <StyledAutocomplete
            disablePortal
            value={value_SubRincianObjek}
            onChange={(event, newValue) => {
              setValue_SubRincianObjek(newValue);
              console.log(newValue);
            }}
            id="SubRincianObjek"
            options={sub_rincian_objek}
            disabled={value_Nomenklatur.level<"6"}
            renderInput={(params) => (
              <TextField {...params} label="Sub Rincian Objek" />
            )}
          />
        </Grid>
        <Grid item xs={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StyledDatePicker
              label="Mulai"
              value={value_mulai}
              onChange={(newValue) => {
                setValue_mulai(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} sx={{ svg: { color: "#008000;" } }} />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StyledDatePicker
              label="Selesai"
              value={value_selesai}
              onChange={(newValue) => {
                setValue_selesai(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} sx={{ svg: { color: "#008000;" } }} />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}></Grid>

        <Grid item xs={12}>
          <Button
            sx={{ "margin-left": 10, float: "right" }}
            variant="contained"
            endIcon={<CloudDownloadIcon />}
          >
            Excell
          </Button>
          <Button
            sx={{ float: "right" }}
            variant="outlined"
            startIcon={<ApprovalIcon />}
          >
            Terapkan
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default SKPD;
