import "./uploaddatadashboardbelanja.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { Alert, Button, Grid } from "@mui/material";


const UploadDataDashboardBelanja = ({ inputs, title }) => {
  const [setFile] = useState("");
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        
        <div className="bottom">
        <Grid container spacing={2}>
          <Grid item xs={12}>
          <form>
            <div className="formInput">
              <p className="title"> Silahkan masukkan file Excell Data Dashboard Belanja</p>
              <p className="title2"> Klik Gambar dibawah ini</p>
              <label htmlFor="file">
                <DriveFolderUploadOutlinedIcon className="icon" />
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
              <Alert variant="outlined"> Data sudah terupload</Alert>
              <Alert color="error" variant="outlined">Data belum terupload </Alert>

              <div className="kirim">
                <Button variant="contained">KIRIM</Button>
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

export default UploadDataDashboardBelanja;
