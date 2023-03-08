import React, { useState, useEffect } from "react";
import { Button, Grid, MenuItem, Select, TextField } from "@mui/material"
import Layout from "../Layout";

const RptSaldoAwal = () => {
    const [opsi_unitSkpd, setOpsiUnitSkpd] = useState([])
    const [m_unitSkpd, setUnitSkpd] = useState('')
    const [m_laporan, setLaporan] = useState('lra')
    const [m_level, setLevel] = useState(3)

    useEffect(()=>{
        axios.get('unitSkpd/byuser').then(response=>{
          setOpsiUnitSkpd(response.data.data)
        })
    }, [])

    useEffect(()=>{
        console.log({level: m_level})
    }, [m_level])

    useEffect(()=>{
        console.log({laporan: m_laporan})
    }, [m_laporan])

    const handleLaporanChange = e => {
        setLaporan(e.target.value)
    }
    const handleLevelChange = e => {
        setLevel(parseInt(e.target.value))
    }
    const handleUniSkpdChange = e => {
        setUnitSkpd(e.target.value)
    }

    return ( 
    <Layout>
        <Grid container spacing={2} >
            <Grid item xs={12} md={6}>
                <TextField 
                    select
                    readOnly={opsi_unitSkpd.length>1}
                    value={m_unitSkpd}
                    label="Unit SKPD"
                    fullWidth
                    onChange={handleUniSkpdChange}
                >
                    {opsi_unitSkpd.map((option)=>(
                    <MenuItem key={option.kodeUnitSkpd} value={option.kodeUnitSkpd}>
                        {option.kodeUnitSkpd} - {option.unitSkpd}
                    </MenuItem> 
                    ))}
                </TextField>
            </Grid>

            <Grid item xs={12} md={2}>
                <TextField value={m_laporan} fullWidth label="Laporan Saldo Awal" select onChange={handleLaporanChange}>
                    <MenuItem value="lra" >Laporan Realisasi Anggaran</MenuItem>
                    <MenuItem value="lo" >Laporan Operasional</MenuItem>
                    <MenuItem value="neraca" >Neraca</MenuItem>
                    <MenuItem value="lpe" >Laporan Perubahan Ekuitas</MenuItem>
                </TextField>
            </Grid>

            <Grid item xs={12} md={2}>
                <TextField value={m_level} select fullWidth label="Level" onChange={handleLevelChange} >
                    <MenuItem value="3"> 3 - Jenis</MenuItem>
                    <MenuItem value="4"> 4 - Obyek</MenuItem>
                    <MenuItem value="5"> 5 - Rincian Obyek</MenuItem>
                    <MenuItem value="6"> 6 - Sub Rincian Obyek</MenuItem>
                </TextField>
            </Grid>
            <Grid item xs={12} md={2}>
                <Button variant="contained" fullWidth >Tampilkan</Button>
            </Grid>
        </Grid>
    </Layout>
    )
}

export default RptSaldoAwal;