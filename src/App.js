import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";

import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {  userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import BukuBesar from "./pages/buku-besar/BukuBesar";
import Jurnal2Approve from "./pages/jurnal2approve/Jurnal2Approve";
import Neraca from "./pages/neraca/Neraca";
import Profile from "./pages/profile/Profile";
import InputSaldoAwal from "./pages/inputsaldoawal/InputSaldoAwal";
import JurnalUmum from "./pages/jurnalumum/JurnalUmum";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />

            {/* CODE ASLI*/}
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>

             {/* input saldo awal */}
             <Route path="inputSaldoAwal">
              <Route index element={<InputSaldoAwal />} />
            </Route>

            {/* jurnal umum */}
            <Route path="jurnalumum">
              <Route index element={<JurnalUmum />} />
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
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
