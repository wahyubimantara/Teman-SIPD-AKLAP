import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "../../service/axios";

const JurnalKoreksi = () => {
    const [data, setData] = useState([]);

    const columns = [
        { field: "nomor", headerName: "Nomor Bukti", width: 150 },
        { field: "tanggal", headerName: "Tanggal", width: 150 },
        { field: "keterangan", headerName: "Keterangan", width: 150 }        
    ]

    useEffect(()=>{
        axios.get('koreksi').then(res=>{
            res.json().then()
        }).catch(err=>{
            
        })
    }, [])
    return (
        <Layout>
            <DataGrid
                columns={columns}
                rows={data}
             />
        </Layout>
    )
};

export default JurnalKoreksi;