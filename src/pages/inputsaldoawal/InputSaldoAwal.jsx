import "./inputSaldoAwal.scss";
import { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import {Button, Grid } from "@mui/material";
import excell from "../../components/data/nama_skpd_TempleteSaldoAwal.xlsx";
import FileUpload from "../../components/FileUpload/FileUpload"
import FileList from "../../components/FileList/FileList"

const InputSaldoAwal = ({ inputs, title }) => {
  const [files, setFiles] = useState([]);
  

  const removeFile = (filename) => {
    setFiles(files.filter((file) => file.name !== filename));
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="bottom">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <a
                href={excell}
                download="nama_skpd_TempleteSaldoAwal.xlsx"
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  variant="contained"
                  color="success"
                  sx={{ float: "right" }}
                >
                  Download Template Excell
                </Button>
              </a>
            </Grid>
            <Grid item xs={12}>
            <p className="title"> Silahkan masukkan file Excell Saldo Awal</p>
              
              <FileUpload
                files={files}
                setFiles={setFiles}
                removeFile={removeFile}
              />
              <FileList files={files} removeFile={removeFile} />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default InputSaldoAwal;
