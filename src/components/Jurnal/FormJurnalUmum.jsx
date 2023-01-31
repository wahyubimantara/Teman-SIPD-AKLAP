import { Autocomplete, Grid, TextField, Box, Button  } from "@mui/material";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import axios from "../../service/axios";
import Layout from "../Layout";
import dayjs from 'dayjs';

const FormJurnalKoreksi = () => {
    const initialValues = {
        kodeUnitSkpd: "",
        nomor: "",
        tanggal: dayjs('2022/12/31'),
        keterangan: "",
        kodeSubKegiatan: "",
        kodeRekening: "",
        kodeSubKegiatanBaru: "",
        kodeRekeningBaru: ""
    }
    
    const [opsi_unitSkpd, setOpsiUnitSkpd] = useState([])
    const [opsi_rekening, setOpsiRekening] = useState([])
    const [opsi_rekening1, setOpsiRekening1] = useState([])

    const formik = useFormik({
        initialValues,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        }
    })

    useEffect(()=>{
        axios.get("unitSkpd?size=100").then(response=>{
            let unitSkpds = response.data.data.map((v) => {
                return { label: v.unitSkpd, key: v.kodeUnitSkpd };
              });
              setOpsiUnitSkpd(unitSkpds);
        }).catch(err=>{
            setOpsiUnitSkpd([])
            console.log(err)
        })
    }, []);

    useEffect(()=>{
        if(formik.values.kodeUnitSkpd) {
            axios.get("subKegiatan/belanja?kodeUnitSkpd=" + formik.values.kodeUnitSkpd).then(response=>{
                let items = response.data.data.map((v) => {
                    return { label: v.subKegiatan, key: v.kodeSubKegiatan };
                });
                setOpsiSubKegiatan(items);
            }).catch(err=>{
                setOpsiSubKegiatan([])
                console.log(err)
            })
        }
        else {
            setOpsiSubKegiatan([])
        }
    }, [ formik.values.kodeUnitSkpd ]);

    useEffect(()=>{
        if(formik.values.kodeUnitSkpd && formik.values.kodeSubKegiatan) {
            axios.get("rekening/belanja?kodeUnitSkpd=" + formik.values.kodeUnitSkpd +"&kodeSubKegiatan=" + formik.values.kodeSubKegiatan).then((response) => {
                let items = response.data.data.map((v) => {
                    return { label: v.rekening, key: v.kodeRekening };
                });
                setOpsiRekening(items);
            }).catch(err=>{
                setOpsiRekening([])
                console.log(err)
            })
        }
        else {
            setOpsiRekening([])
        }
    }, [ formik.values.kodeUnitSkpd, formik.values.kodeSubKegiatan ]);

    useEffect(()=>{
        if(formik.values.kodeUnitSkpd && formik.values.kodeSubKegiatanBaru) {
            axios.get("rekening/belanja?kodeUnitSkpd=" + formik.values.kodeUnitSkpd +"&kodeSubKegiatan=" + formik.values.kodeSubKegiatanBaru).then((response) => {    
                let items = response.data.data.map((v) => {
                    return { label: v.rekening, key: v.kodeRekening };
                });
                setOpsiRekening1(items);
            }).catch(err=>{
                setOpsiRekening1([])
                console.log(err)
            })
        }
        else {
            setOpsiRekening1([])
        }
    }, [ formik.values.kodeUnitSkpd, formik.values.kodeSubKegiatanBaru ]);

    return (
        <Layout>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2} >
                    <Grid item>
                        <h2>Jurnal Koreksi</h2>                    
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            name="kodeUnitSkpd"
                            id="kodeUnitSkpd"
                            options={opsi_unitSkpd}
                            autoComplete
                            autoSelect 
                            renderInput={ params => <TextField {...params} label="Unit SKPD" />}
                            onChange={(e, value)=>{ formik.setFieldValue('kodeUnitSkpd', value ? value.key : ''); }}
                            getOptionLabel={ option => `${option.key} - ${option.label}`}
                            isOptionEqualToValue={(option, value) => option.kodeUnitSkpd === value.kodeUnitSkpd }
                            renderOption={(props, option) => (
                              <Box component="li" {...props}>
                                {option.key} - {option.label}
                              </Box>
                            )}
                        />
                    </Grid>
                    <Grid item xs={6} >
                        <TextField
                            fullWidth
                            name="nomor"
                            id="nomor"
                            label="Nomor Memo Koreksi"
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} >
                    <TextField
                            fullWidth
                            name="tanggal"
                            id="tanggal"
                            label="Tanggal"
                            type="date"
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            name="kodeSubKegiatan"
                            options={opsi_subKegiatan}
                            autoComplete
                            autoSelect 
                            renderInput={(params) => <TextField {...params} label="Sub Kegiatan Awal" />}
                            onChange={(e, value)=>{ formik.setFieldValue('kodeSubKegiatan', value ? value.key : ''); }}
                            getOptionLabel={ option => `${option.key} - ${option.label}`}
                            isOptionEqualToValue={(option, value) => option.kodeSubKegiatan === value.kodeSubKegiatan }
                            
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            name="kodeRekening"
                            options={opsi_rekening}
                            autoComplete
                            autoSelect 
                            renderInput={(params) => <TextField {...params} label="Rekening Awal" />}
                            onChange={(e, value)=>{ formik.setFieldValue('kodeRekening', value ? value.key : '') }}
                            getOptionLabel={ option => `${option.key} - ${option.label}`}
                            isOptionEqualToValue={(option, value) => option.kodeSubKegiatan === value.kodeSubKegiatan }
                            
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            name="kodeSubKegiatanBaru"
                            options={opsi_subKegiatan}
                            autoComplete
                            autoSelect 
                            renderInput={(params) => <TextField {...params} label="Sub Kegiatan Valid" />}
                            onChange={(e, value)=>{formik.setFieldValue('kodeSubKegiatanBaru', value ? value.key : ''); }}
                            getOptionLabel={ option => `${option.key} - ${option.label}`}
                            isOptionEqualToValue={(option, value) => option.kodeSubKegiatan === value.kodeSubKegiatan }
                            
                    />
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            name="kodeRekeningBaru"
                            options={opsi_rekening1}
                            autoComplete
                            autoSelect 
                            renderInput={(params) => <TextField {...params} label="Rekening Valid" />}
                            onChange={(e, value)=>{formik.setFieldValue('kodeRekeningBaru', value ? value.key : ''); }}
                            getOptionLabel={ option => `${option.key} - ${option.label}`}
                            isOptionEqualToValue={(option, value) => option.kodeRekening === value.kodeRekening }
                            
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            name="nilai"
                            id="nilai"
                            label="Nilai"
                            type="number"
                            fullWidth

                        ></TextField>
                    </Grid>
                    <Grid item >
                        <Button variant="contained" type="submit">Simpan</Button>
                    </Grid>
                    <Grid item >
                        <Button variant="contained" color="secondary"> Batal</Button>
                    </Grid>
                </Grid>                
            </form>
        </Layout>
    )
};

export default FormJurnalKoreksi;