import { Autocomplete, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import axios from "../../service/axios";

const FormJurnalKoreksi = () => {
    const [unitSkpd, setUnitSkpd] = useState([])
    const [rekening, setRekening] = useState([])
    const [subKegiatan, setSubKegiatan] = useState([])
    const formik = useFormik()

    useEffect(()=>{
        axios.get("unitSkpd").then(response=>{
            let unitSkpds = response.data.data.map((v) => {
                return { label: v.unitSkpd, key: v.kodeUnitSkpd };
              });
              setUnitSkpd(unitSkpds);
        })

        axios.get("rekening?level=6").then((response) => {
            let items = response.data.data.map((v) => {
                return { label: v.rekening, key: v.kodeRekening };
            });
            setRekening(items);
        })

        axios.get("subKegiatan?size=10000").then(response=>{
            let items = response.data.data.map((v) => {
                return { label: v.subKegiatan, key: v.kodeSubKegiatan };
            });
            setSubKegiatan(items);
        })
    })
    return (
        <div>
            <Autocomplete
                name="unitSkpd"
                id="unitSkpd"
                options={unitSkpd}
                onChange={formik.handleChange}
            />
            <TextField
                name="nomor"
                id="nomor"
                onChange={formik.handleChange}
            />
            <DatePicker 
                name="tanggal"
                id="tanggal"
                onChange={formik.handleChange}
            />
            <TextField
                name="keterangan"
                id="keterangan"
                onChange={formik.handleChange}
            />   
            <Autocomplete
                name="subKegiatan"
                id="subKegiatan"
                options={subKegiatan}
                onChange={formik.handleChange}
            />
            <Autocomplete
                name="rekening" 
                id="rekening"
                options={rekening}
                onChange={formik.handleChange}
            />
            <Autocomplete
                name="subKegiatan1"
                id="subKegiatan1"
                options={subKegiatan}
                onChange={formik.handleChange}
            />
            <Autocomplete
                name="rekening1" 
                id="rekening1"
                options={rekening}
                onChange={formik.handleChange}
            />
            <TextField 
                name="nilai"
                id="nilai"
                onChange={formik.handleChange}
            />                    
        </div>
    )
};

export default FormJurnalKoreksi;