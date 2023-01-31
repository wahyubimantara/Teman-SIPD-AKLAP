import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { BrowserRouter, Routes, Route, Navigate, Outlet, Link } from "react-router-dom";

import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import BukuBesar from "./pages/buku-besar/BukuBesar";
import Jurnal2Approve from "./pages/jurnal2approve/Jurnal2Approve";
import Neraca from "./pages/neraca/Neraca";
import Profile from "./pages/profile/Profile";
import InputSaldoAwal from "./pages/inputsaldoawal/InputSaldoAwal";
import UploadDataDashboardBelanja from "./pages/uploaddatadashboardbelanja/UploadDataDashboardBelanja";
import JurnalUmum from "./pages/jurnalumum/JurnalUmum";
import JurnalKoreksi from "./components/Jurnal/JurnalKoreksi";
import auth from "./service/auth";
import { Box, Card, rgbToHex, Typography } from "@mui/material"; 

const ProtectedRoute = ({ redirectPath = '/login', children }) => {
  if (!auth.logged()) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

const Page404 = () => {
  return (
    <Card >
      <Typography variant="h1">
        404
      </Typography>
      <Typography variant="h6">
        Halaman tidak ditemukan ....
      </Typography>
      <Link to="/" variant="contained">Back Home</Link>
  </Card> 
  )
}

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route index element={<ProtectedRoute children={<Home />} />} />
             {/* input saldo awal */}
             <Route path="inputSaldoAwal">
              <Route index element={<InputSaldoAwal />} />
            </Route>

            {/* Upload Data Dashboard Belanja */}
            <Route path="jurnalumum" element={<ProtectedRoute/>}>
                <Route index element={<JurnalUmum />} />
            </Route>
            
            {/* jurnal umum */}
            <Route path="uploaddatadashboardbelanja" element={<ProtectedRoute/>}>
              <Route index element={<UploadDataDashboardBelanja />} />
            </Route>

            {/* jurnal to approve */}
            <Route path="jurnal2approve" element={<ProtectedRoute/>}>
              <Route index element={<Jurnal2Approve />} />
            </Route>

            {/* buku besar */}
            <Route path="buku-besar" element={<ProtectedRoute/>}>
              <Route index element={<BukuBesar />} />
              
            </Route>

            {/* neraca*/}
            <Route path="neraca" element={<ProtectedRoute/>}>
              <Route index element={<Neraca />} />
              
            </Route>

            {/* lra*/}
            <Route path="lra" element={<ProtectedRoute/>}>
              <Route index element={<Neraca />} />
              
            </Route>

            {/* lo*/}
            <Route path="lo" element={<ProtectedRoute/>}>
              <Route index element={<Neraca />} />
              
            </Route>

            {/* lpe*/}
            <Route path="lpe" element={<ProtectedRoute/>}>
              <Route index element={<Neraca />} />
              
            </Route>

            {/* profile*/}
            <Route path="profile" element={<ProtectedRoute/>}>
              <Route index element={<Profile />} />
            </Route>

            <Route path="koreksibelanja" element={<ProtectedRoute />} >
              <Route index element={<JurnalKoreksi />} />
            </Route>

            <Route path="*" element={<Page404 />}>

            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
