import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "../../service/axios";
import RincianJurnal from "../../components/Jurnal/RincianJurnal";


const PageJurnalUmum = () => {
    return (
        <Layout>
             <RincianJurnal />
        </Layout>

    )
}

export default PageJurnalUmum