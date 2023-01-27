import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
             {/* input saldo awal */}
             <Route path="inputSaldoAwal">
              <Route index element={<InputSaldoAwal />} />
            </Route>

            {/* Upload Data Dashboard Belanja */}
            <Route path="jurnalumum">
              <Route index element={<JurnalUmum />} />
            </Route>

            {/* jurnal umum */}
            <Route path="uploaddatadashboardbelanja">
              <Route index element={<UploadDataDashboardBelanja />} />
            </Route>

            {/* jurnal to approve */}
            <Route path="jurnal2approve">
              <Route index element={<Jurnal2Approve />} />
            </Route>

            {/* buku besar */}
            <Route path="buku-besar">
              <Route index element={<BukuBesar />} />
              
            </Route>

            {/* neraca*/}
            <Route path="neraca">
              <Route index element={<Neraca />} />
              
            </Route>

            {/* lra*/}
            <Route path="lra">
              <Route index element={<Neraca />} />
              
            </Route>

            {/* lo*/}
            <Route path="lo">
              <Route index element={<Neraca />} />
              
            </Route>

            {/* lpe*/}
            <Route path="lpe">
              <Route index element={<Neraca />} />
              
            </Route>

            {/* profile*/}
            <Route path="profile">
              <Route index element={<Profile />} />
            </Route>

            <Route path="koreksi">
              <Route index element={<JurnalKoreksi />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
