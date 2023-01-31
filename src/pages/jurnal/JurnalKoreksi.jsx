import { DataGrid } from "@mui/x-data-grid";
import Layout from "../../components/Layout";

const JurnalKoreksi = () => {
    const columns = [
        { field: "nomor", headerName: "Nomor Bukti", width: 150 },
        { field: "tanggal", headerName: "Tanggal", width: 150 },
        { field: "keterangan", headerName: "Keterangan", width: 150 }        
    ]
    return (
        <Layout>
            <DataGrid
                
             />
        </Layout>
    )
};

export default JurnalKoreksi;