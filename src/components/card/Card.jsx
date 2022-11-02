import "./card.scss";
import * as React from "react";
import "react-circular-progressbar/dist/styles.css";
import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ApprovalIcon from "@mui/icons-material/Approval";
import ClearIcon from '@mui/icons-material/Clear';
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

import { styled } from "@mui/material/styles";
import { useState , useEffect} from "react";
import axios from "../../axios";


const Nomenklatur = [
  { label: "Level 1. Akun", level: "level=1" },
  { label: "Level 2. Kelompok", level: "level=2" },
  { label: "Level 3. Jenis", level: "level=3" },
  { label: "Level 4. Objek", level: "level=4" },
  { label: "Level 5. Rincian Objek", level: "level=5" },
  { label: "Level 6. Sub Rincian Objek", level: "level=6 "}

];

// styling Autocomplete
const StyledAutocomplete = styled(Autocomplete)({
  "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
    // Default transform is "translate(14px, 20px) scale(1)""
    // This lines up the label with the initial cursor position in the input
    // after changing its padding-left.
    transform: "translate(14px, 20px) scale(1);",
    color:"#008000;"
  },
  "& .MuiAutocomplete-inputRoot": {
    color: "purple",
    // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
      // Default left padding is 6px
      paddingLeft: 6
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(224, 224, 224, 1)"
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "blue"
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "purple"
    }
  }
});

// styling DatePicker
const StyledDatePicker = styled(DatePicker)({
  "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
    // Default transform is "translate(14px, 20px) scale(1)""
    // This lines up the label with the initial cursor position in the input
    // after changing its padding-left.
    transform: "translate(14px, 20px) scale(1);",
    color:"#008000;"
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(224, 224, 224, 1)"
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "blue"
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "purple"
  
  }
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

// tanggal mulai-selesai
const [value_mulai, setValue_mulai] = React.useState(null);
const [value_selesai, setValue_selesai] = React.useState(null);

// skpd
const [value_skpd, setValue_skpd] = React.useState(null);
// unit skpd
const [value_unitSkpd, setValue_unitSkpd] = React.useState(null);


  return (
      <div className="neraca">
        <Grid container spacing={4}>
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
              renderInput={(params) => <TextField {...params} label="SKPD" />}
            />
          </Grid>

          <Grid item xs={6}>
            <StyledAutocomplete
              disablePortal
              value={value_unitSkpd}
            onChange={(event, newValue) => {
              setValue_unitSkpd(newValue);
              console.log(newValue);
            }}
              id="unit"
              options={unitSkpd}
              renderInput={(params) => <TextField {...params} label="Unit SKPD" />}
            />
          </Grid>

          <Grid item xs={6}>
            <StyledAutocomplete
              disablePortal
              id="kodefikasi"
              options={Nomenklatur}
              // sx={4}
              renderInput={(params) => (
                <TextField {...params} label="Klasifikasi, Kodefikasi dan Nomenklatur Rekening
                " />
              )}
            />
          </Grid>

          
          <Grid item xs={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StyledDatePicker
                label="Mulai"
                value={value_mulai}
              onChange={(newValue) => {
                setValue_mulai(newValue);
              }}
                renderInput={(params) => <TextField {...params}  sx={{svg: { color: "#008000;" }}}/>}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StyledDatePicker
                label="Selesai"
                value={value_selesai}
              onChange={(newValue) => {
                setValue_selesai(newValue);
              }}
                renderInput={(params) => <TextField {...params} sx={{svg: { color: "#008000;" }}}/>}
                />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={4}>
          <Button sx={{"float": "left"}} variant="outlined" startIcon={<ApprovalIcon />}>
            Terapkan
          </Button>
          <Button sx={{"margin-left":10,"float": "left"}} variant="contained" color="error" startIcon={<ClearIcon />}>
            Reset
          </Button>
          <Button sx={{"margin-left":40,"float": "left"}} variant="contained" endIcon={<CloudDownloadIcon />}>
            Excell
          </Button>
          </Grid>
          <Grid item xs={4}>
          </Grid>
          
        </Grid>
      </div>
  );
};

export default Card;
