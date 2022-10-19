import "./inputSaldoAwal.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { Alert, Button } from "@mui/material";

const InputSaldoAwal = ({ inputs, title }) => {
  // const [file, setFile] = useState("");
  const [setFile] = useState("");
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="bottom">
          <form>
            <div className="formInput">
              <p className="title"> Silahkan masukkan file Excell Saldo Awal</p>
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
              <Alert color="error" variant="outlined"> Data belum terupload</Alert>
              
              <div className="kirim">
              <Button variant="contained">
                  KIRIM
              </Button>
              </div>
              
              

            </div>
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default InputSaldoAwal;
