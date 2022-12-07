import "./inputSaldoAwal.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { Alert, Button, Grid } from "@mui/material";
import excell from '../../components/data/nama_skpd_TempleteSaldoAwal.xlsx';
import Axios from "axios";

const InputSaldoAwal = ({ inputs, title }) => {
   const onChangeFile = (e) => {
    console.log(e.target.files[0])
    if (e.target && e.target.files[0]) {
      formData.append('file',e.target.files[0]);
    }
  }

  const SubmitFileData = (e) => {
    Axios.post(
      'https://v2.convertapi.com/upload', 
      {formData}
    )
    .then (res => {
      console.log(res);
    }
    )
    .catch(error =>{
      console.log(error);
    })
  }
  let formData = new FormData();
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        
        <div className="bottom">
        <Grid container spacing={2}>
          <Grid item xs={12}>
          <a href={excell} download="nama_skpd_TempleteSaldoAwal.xlsx" target='_blank' rel="noreferrer">
          <Button variant="contained" color="success" sx={{"float":"right"} }>
            Download Template Excell
            </Button>
            </a>
          </Grid>
          <Grid item xs={12}>
          <form>
            <div className="formInput">
              <p className="title"> Silahkan masukkan file Excell Saldo Awal</p>
              <p className="title2"> Klik Pilih File dibawah ini</p>
              <label htmlFor="file">
                <DriveFolderUploadOutlinedIcon className="icon" />
              </label>
              <input type="file" id="file_upload" onChange={onChangeFile} />
              
              <div className="kirim">
                <Button variant="contained" onClick={SubmitFileData}>KIRIM</Button>
              </div>
            </div>
          </form>
          </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default InputSaldoAwal;
