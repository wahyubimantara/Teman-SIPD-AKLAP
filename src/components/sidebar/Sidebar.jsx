import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AssignmentIcon from '@mui/icons-material/Assignment';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import BookIcon from '@mui/icons-material/Book';
import StyleIcon from '@mui/icons-material/Style';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import InputIcon from '@mui/icons-material/Input';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import logo2 from '../data/logo2.png';
import CreateIcon from '@mui/icons-material/Create';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
        <img src={logo2} className="logo" alt="" />
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
        <p className="text-logo">Teman SIPD AKLAP</p>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <Link to="/" style={{ textDecoration: "none" }}>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
            </Link>
          </li>
          <p className="title">Data</p>
          
          <Link to="/inputsaldoawal" style={{ textDecoration: "none" }}>
            <li>
              <InputIcon className="icon" />
              <span>Input Saldo Awal</span>
            </li>
          </Link>

          <Link to="/uploaddatadashboardbelanja" style={{ textDecoration: "none" }}>
            <li>
              <CloudUploadIcon className="icon" />
              <span>Data Dashboard Belanja</span>
            </li>
          </Link>

          <Link to="/jurnalumum" style={{ textDecoration: "none" }}>
            <li>
              <CreateIcon className="icon" />
              <span>Jurnal Umum</span>
            </li>
          </Link>
          <Link to="/jurnal2approve" style={{ textDecoration: "none" }}>
            <li>
              <AssignmentIcon className="icon" />
              <span>Jurnal to Approve</span>
            </li>
          </Link>
          <Link to="/buku-besar" style={{ textDecoration: "none" }}>
            <li>
              <LibraryBooksIcon className="icon" />
              <span>Buku Besar</span>
            </li>
          </Link>
          
          <p className="title">Laporan Keuangan</p>
          <Link to="/neraca" style={{ textDecoration: "none" }}>
          <li>
            <InsertChartIcon className="icon" />
            <span>Neraca</span>
          </li>
          </Link>
          <Link to="/lra" style={{ textDecoration: "none" }}>
          <li>
            <BookIcon className="icon" />
            <span>LRA</span>
          </li>
          </Link>
          <Link to="/lo" style={{ textDecoration: "none" }}>
          <li>
            <AutoStoriesIcon className="icon" />
            <span>LO</span>
          </li>
          </Link>
          <Link to="/lpe" style={{ textDecoration: "none" }}>
          <li>
            <StyleIcon className="icon" />
            <span>LPE</span>
          </li>
          </Link>
          <p className="title">USER</p>
          <Link to="/profile" style={{ textDecoration: "none" }}>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          </Link>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
