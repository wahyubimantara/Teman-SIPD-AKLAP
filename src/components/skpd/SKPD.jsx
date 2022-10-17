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
      borderColor: "rgba(224, 224, 224, 1);"
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
    borderColor: "rgba(224, 224, 224, 1);"
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "blue"
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "purple"
  
  }
});

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
  {
    label: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { label: "The Good, the Bad and the Ugly", year: 1966 },
  { label: "Fight Club", year: 1999 },
  {
    label: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    label: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { label: "Forrest Gump", year: 1994 },
  { label: "Inception", year: 2010 },
  {
    label: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { label: "Goodfellas", year: 1990 },
  { label: "The Matrix", year: 1999 },
  { label: "Seven Samurai", year: 1954 },
  {
    label: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
  { label: "City of God", year: 2002 },
  { label: "Se7en", year: 1995 },
  { label: "The Silence of the Lambs", year: 1991 },
  { label: "It's a Wonderful Life", year: 1946 },
  { label: "Life Is Beautiful", year: 1997 },
  { label: "The Usual Suspects", year: 1995 },
  { label: "Léon: The Professional", year: 1994 },
  { label: "Spirited Away", year: 2001 },
  { label: "Saving Private Ryan", year: 1998 },
  { label: "Once Upon a Time in the West", year: 1968 },
  { label: "American History X", year: 1998 },
  { label: "Interstellar", year: 2014 },
  { label: "Casablanca", year: 1942 },
  { label: "City Lights", year: 1931 },
  { label: "Psycho", year: 1960 },
  { label: "The Green Mile", year: 1999 },
  { label: "The Intouchables", year: 2011 },
  { label: "Modern Times", year: 1936 },
  { label: "Raiders of the Lost Ark", year: 1981 },
  { label: "Rear Window", year: 1954 },
  { label: "The Pianist", year: 2002 },
  { label: "The Departed", year: 2006 },
  { label: "Terminator 2: Judgment Day", year: 1991 },
  { label: "Back to the Future", year: 1985 },
  { label: "Whiplash", year: 2014 },
  { label: "Gladiator", year: 2000 },
  { label: "Memento", year: 2000 },
  { label: "The Prestige", year: 2006 },
  { label: "The Lion King", year: 1994 },
  { label: "Apocalypse Now", year: 1979 },
  { label: "Alien", year: 1979 },
  { label: "Sunset Boulevard", year: 1950 },
  {
    label:
      "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1964,
  },
  { label: "The Great Dictator", year: 1940 },
  { label: "Cinema Paradiso", year: 1988 },
  { label: "The Lives of Others", year: 2006 },
  { label: "Grave of the Fireflies", year: 1988 },
  { label: "Paths of Glory", year: 1957 },
  { label: "Django Unchained", year: 2012 },
  { label: "The Shining", year: 1980 },
  { label: "WALL·E", year: 2008 },
  { label: "American Beauty", year: 1999 },
  { label: "The Dark Knight Rises", year: 2012 },
  { label: "Princess Mononoke", year: 1997 },
  { label: "Aliens", year: 1986 },
  { label: "Oldboy", year: 2003 },
  { label: "Once Upon a Time in America", year: 1984 },
  { label: "Witness for the Prosecution", year: 1957 },
  { label: "Das Boot", year: 1981 },
  { label: "Citizen Kane", year: 1941 },
  { label: "North by Northwest", year: 1959 },
  { label: "Vertigo", year: 1958 },
  {
    label: "Star Wars: Episode VI - Return of the Jedi",
    year: 1983,
  },
  { label: "Reservoir Dogs", year: 1992 },
  { label: "Braveheart", year: 1995 },
  { label: "M", year: 1931 },
  { label: "Requiem for a Dream", year: 2000 },
  { label: "Amélie", year: 2001 },
  { label: "A Clockwork Orange", year: 1971 },
  { label: "Like Stars on Earth", year: 2007 },
  { label: "Taxi Driver", year: 1976 },
  { label: "Lawrence of Arabia", year: 1962 },
  { label: "Double Indemnity", year: 1944 },
  {
    label: "Eternal Sunshine of the Spotless Mind",
    year: 2004,
  },
  { label: "Amadeus", year: 1984 },
  { label: "To Kill a Mockingbird", year: 1962 },
  { label: "Toy Story 3", year: 2010 },
  { label: "Logan", year: 2017 },
  { label: "Full Metal Jacket", year: 1987 },
  { label: "Dangal", year: 2016 },
  { label: "The Sting", year: 1973 },
  { label: "2001: A Space Odyssey", year: 1968 },
  { label: "Singin' in the Rain", year: 1952 },
  { label: "Toy Story", year: 1995 },
  { label: "Bicycle Thieves", year: 1948 },
  { label: "The Kid", year: 1921 },
  { label: "Inglourious Basterds", year: 2009 },
  { label: "Snatch", year: 2000 },
  { label: "3 Idiots", year: 2009 },
  { label: "Monty Python and the Holy Grail", year: 1975 },
];

const SKPD = () => {
  const [value, setValue] = React.useState(null);
  return (
      <div className="skpd">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StyledAutocomplete
              disablePortal
              id="skpd"
              options={top100Films}
              // sx={4}
              renderInput={(params) => <TextField {...params} label="SKPD" />}
            />
          </Grid>

          <Grid item xs={12}>
            <StyledAutocomplete
              disablePortal
              id="unit-skpd"
              options={top100Films}
              // sx={4}
              renderInput={(params) => (
                <TextField {...params} label="Unit SKPD" />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <StyledAutocomplete
              disablePortal
              id="kodefikasi"
              options={top100Films}
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
              id="akun"
              options={top100Films}
              // sx={4}
              renderInput={(params) => <TextField {...params} label="Akun" />}
            />
          </Grid>
          <Grid item xs={6}>
            <StyledAutocomplete
              disablePortal
              id="kelompok"
              options={top100Films}
              // sx={4}
              renderInput={(params) => (
                <TextField {...params} label="Kelompok" />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <StyledAutocomplete
              disablePortal
              id="jenis"
              options={top100Films}
              // sx={4}
              renderInput={(params) => <TextField {...params} label="Jenis" />}
            />
          </Grid>
          <Grid item xs={6}>
            <StyledAutocomplete
              disablePortal
              id="objek"
              options={top100Films}
              // sx={4}
              renderInput={(params) => <TextField {...params} label="Objek" />}
            />
          </Grid>

          <Grid item xs={6}>
            <StyledAutocomplete
              disablePortal
              id="RincianObjek"
              options={top100Films}
              // sx={4}
              renderInput={(params) => (
                <TextField {...params} label="Rincian Objek" />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <StyledAutocomplete
              disablePortal
              id="SubRincianObjek"
              options={top100Films}
              // sx={4}
              renderInput={(params) => (
                <TextField {...params} label="Sub Rincian Objek" />
              )}
            />
          </Grid>
          <Grid item xs={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StyledDatePicker
                label="Mulai"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} sx={{svg: { color: "#008000;" }}}/>}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StyledDatePicker
                label="Selesai"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} sx={{svg: { color: "#008000;" }}}/>}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}></Grid>
      
          <Grid item xs={12}>
          <Button sx={{"margin-left":10,"float": "right"}} variant="contained" endIcon={<CloudDownloadIcon />}>
            Excell
          </Button>
          <Button sx={{"float": "right"}} variant="outlined" startIcon={<ApprovalIcon />}>
            Terapkan
          </Button>
          
      
          </Grid>
          
        </Grid>
      </div>
  );
};

export default SKPD;
