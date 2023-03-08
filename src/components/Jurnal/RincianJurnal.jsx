import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Autocomplete, Box, Button, FormControl, Grid, InputLabel, Menu, MenuItem, Paper, Select, TextField } from "@mui/material";
import ApprovalIcon from "@mui/icons-material/Approval";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import "./tabel-jurnal.scss"
import { Stack } from "@mui/system";
import numberFormat from "../../service/numberFormat";
import { setNestedObjectValues } from "formik";
import PropTypes from 'prop-types'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { InputOutlined } from "@mui/icons-material";
import axios from '../../service/axios' ;

import rekenings from '../../data/rekening-all.json';

const BalanceJournalStatusComponent = (props) => {
  return (
    <Box sx={{ p: 1, display: 'flex' }}>
      Status Jurnal : 
      <FiberManualRecordIcon
        fontSize="small"
        sx={{
          mx: 1,
          color: props.status ? '#4caf50' : '#d9182e',
        }}
      />
      <b>{props.status ? 'balance' : 'tidak balance'}</b>
    </Box>
  );
}
BalanceJournalStatusComponent.propTypes = {
  status: PropTypes.bool.isRequired,
  rows: PropTypes.array.isRequired
}

export { BalanceJournalStatusComponent }

const rekLists = {
  '101': {
    'D': v => v.kodeRekening.startsWith('1.3') || v.kodeRekening.startsWith('1.5'),
    'K': v => v.kodeRekening.startsWith('1.7')
  } 
}

const rekeningRules = {
  '101': {
    D: {
      OR: [
        {
          kodeRekening: {
            startsWith: '8.1.02.01'
          }
        },
        {
          kodeRekening: {
            startsWith: '8.1.02.88'
          }
        },
        {
          kodeRekening: {
            startsWith: '8.1.02.99'
          }
        },
      ]
    },
    K: {
      kodeRekening: {
        startsWith: '1.1.12'
      }
    } 
  },
  '102': {
    K: {
      OR: [
        {
          kodeRekening: {
            startsWith: '8.1.02.01'
          }
        },
        {
          kodeRekening: {
            startsWith: '8.1.02.88'
          }
        },
        {
          kodeRekening: {
            startsWith: '8.1.02.99'
          }
        },
      ]
    },
    D: {
      kodeRekening: {
        startsWith: '1.1.12'
      }
    } 
  },
  '103': {
    D: {
      OR: [
        {
          kodeRekening: {
            startsWith: '8.1.02.01'
          }
        },
        {
          kodeRekening: {
            startsWith: '8.1.02.88'
          }
        },
        {
          kodeRekening: {
            startsWith: '8.1.02.99'
          }
        },
      ]
    },
    K: {
      kodeRekening: {
        startsWith: '1.1.12'
      }
    } 
  },


}

const RincianJurnal = (props) => {
  const emptyFn = () => {}
  const emptyArrayFn = async () => []
  const columnId = props.columnId || "id"
  const onDataChange = props.onDataChange || emptyFn
  const rekeningDebetGetter = props.fnRekeningD || emptyArrayFn
  const rekeningKreditGetter = props.fnRekeningK || emptyArrayFn
  const disableEdit = !!props.disableEdit;
  const shouldBalance = !!props.shouldBalance;
  
  const opsi_rekening = [
    { kodeRekening: '1.1', rekening: 'Aset Lancar' },
    { kodeRekening: '1.2', rekening: 'Aset sss' },
    { kodeRekening: '1.3', rekening: 'Aset s3' }
  ]

  let [rows, setRows] = useState( props.rows || [
    // { id: 1, kodeRekening: opsi_rekening[0].kodeRekening, rekening: opsi_rekening[0].rekening, d_k: 'K', nilai: 1500},
    // { id: 2, kodeRekening: opsi_rekening[1].kodeRekening, rekening: opsi_rekening[1].rekening, d_k: 'D', nilai: 12345678901.23},
    // { id: 3, kodeRekening: opsi_rekening[2].kodeRekening, rekening: opsi_rekening[2].rekening, d_k: 'D', nilai: 1500},
    // { id: 4, kodeRekening: opsi_rekening[0].kodeRekening, rekening: opsi_rekening[0].rekening, d_k: 'D', nilai: 1500},
    // { id: 5, kodeRekening: opsi_rekening[2].kodeRekening, rekening: opsi_rekening[2].rekening, d_k: 'D', nilai: 1500},
  ]);

  const columns = [
    { field: columnId, headerName: "No Urut", editable: false, sortable: false, hideable: false, filterable: false, minWidth: 40 },
    { field: "kodeRekening", headerName: "Kode Rekening", sortable: false, editable: false, hideable: false, filterable: false, minWidth: 140 },
    { field: "rekening", headerName: "Rekening", sortable: false, editable: false, hideable: false, filterable: false, minWidth: "500", flex: 1 },
    { field: "d_k", headerName: "D/K", sortable: false, editable: false, hideable: false, filterable: false, width: 30 },
    { 
      field: "nilai", 
      // headerName: "Nilai", 
      // type: "number", 
      // editable: false, 
      // hideable: false,
      // filterable: false, 
      // sortable: false,
      // hidden: true,
      // //valueFormatter: v => numberFormat.format(v.value),
      // width: 150
    },
    {
      field: "debet",
      headerName: "Debet",
      type: "number",
      editable: false, 
      hideable: false,
      filterable: false, 
      sortable: false,
      valueGetter: e => e.row.d_k == 'D' ? e.row.nilai : null,
      valueFormatter: v => numberFormat.format(v.value),
      width: 150
    },    
    {
      field: "kredit",
      headerName: "Kredit",
      type: "number",
      editable: false, 
      hideable: false,
      filterable: false, 
      sortable: false,
      valueGetter: e => e.row.d_k == 'K' ? e.row.nilai : null,
      valueFormatter: v => numberFormat.format(v.value),
      width: 150
    }    
  ]

  const editingStateEnum = {
    Idle: 0,
    Edit: 1,
    New: 2
  }
  const statusEnum = {
    Draft: 0,
    Verified: 1,
    Approved: 2
  }
  /// Component state 
  const [m_jurnalId, setJurnalId] = useState('')
  const [m_editingState, setEditingState] = useState(editingStateEnum.Idle) 
  const [m_selectedRowIds, setSelectedRowIds] = useState(rows.length > 0 ? [rows[0][columnId]] : [])
  const [m_editedRow, setEditedRow] = useState({})
  const [m_unitSkpd, setUnitSkpd] = useState(undefined)
  const [m_subJenis, setSubJenis] = useState(undefined)
  const [opsi_unitSkpd, setOpsiUnitSkpd] = useState([])
  const isStateIdle = () => m_editingState == editingStateEnum.Idle
  const isStateNew = () => m_editingState == editingStateEnum.New
  const isStateEdit = () => m_editingState == editingStateEnum.Edit
  
  /// Component data
  const [opsiRekDebet, setOpsiRekDebet] = useState(rekenings)
  const [opsiRekKredit, setOpsiRekKredit] = useState(rekenings)

  const [m_dk, setDK] = useState('D')
  const [m_rekening, setRekening] = useState({})
  const [m_nilai, setNilai] = useState(0.0)
  const [m_nomorBukti, setNomorBukti] = useState("")
  const [m_status, setStatus] = useState(0)

  useEffect(()=>{
    //rekeningDebetGetter().then(data=>setOpsiRekDebet(data))
    //rekeningKreditGetter().then(data=>setOpsiRekKredit(data))

    axios.get('unitSkpd/byuser').then(response=>{
      setOpsiUnitSkpd(response.data.data)
    })
  }, [])
  
  useEffect(()=>{
    if(m_selectedRowIds.length>0 && m_editingState == editingStateEnum.Idle) {
      const selected = rows.filter(x=>x[columnId]==m_selectedRowIds[0])

      if(selected.length>0) {
        setDK(selected[0].d_k)
        setRekening({kodeRekening: selected[0].kodeRekening, rekening: selected[0].rekening})
        setNilai(selected[0].nilai)
      }
      else {
        setDK('')
        setRekening(null)
        setNilai(0)
      }
    }
  }, [m_selectedRowIds])

  const handleAddClick = () => {
    const selected = rows.filter(v=>v[columnId] == m_selectedRowIds[0]) 
    setEditedRow(selected[0])

    setDK(null)
    setRekening(null)
    setNilai(null)

    setEditingState(editingStateEnum.New)
  }

  const handleEditClick = () => {
    const selected = rows.filter(v=>v[columnId] == m_selectedRowIds[0]) 
    setEditedRow(selected[0])
    setEditingState(editingStateEnum.Edit) 
  }

  const handleDeleteClick = () => { 
    let i = 1
    let tempRows = rows
      .filter(v=> v[columnId] != m_selectedRowIds[0])
      .map(row=>{ row[columnId] = i++; return row; })
    setRows(tempRows)
    onDataChange({reason: 'delete', data: tempRows})
  }

  const handleSaveClick = () => {
    let tempRows;
    let found = false
    if(m_editingState == editingStateEnum.Edit) {
      tempRows = rows.map(x=>{
        if(!found && x[columnId]==m_editedRow[columnId]) {
          x.rekening = m_rekening.rekening
          x.kodeRekening = m_rekening.kodeRekening
          x.nilai = m_nilai
          x.d_k = m_dk

          found = true
        }
        return x
      });
    }
    if(m_editingState == editingStateEnum.New) {
      tempRows = Array.from(rows)
      let newRow = {}
      newRow[columnId] = tempRows.length + 1;
      newRow.kodeRekening = m_rekening.kodeRekening
      newRow.rekening = m_rekening.rekening
      newRow.d_k = m_dk
      newRow.nilai = m_nilai
      tempRows.push(newRow)
    }
    
    setRows(tempRows)
    onDataChange({reason: m_editingState == editingStateEnum.New ? "new" : "update", data: tempRows})

    //console.log(rows, tempRows)
    if(m_editingState == editingStateEnum.New) 
      setSelectedRowIds([tempRows.at(-1)[columnId]])

    setEditingState(editingStateEnum.Idle)
  }

  const handleCancelClick = () => {
    const tempSelected = m_selectedRowIds;
    setEditingState(editingStateEnum.Idle)
    
    if(m_selectedRowIds.length>0) {
      setDK(m_editedRow.d_k)
      setRekening({kodeRekening: m_editedRow.kodeRekening, rekening: m_editedRow.rekening})
      setNilai(m_editedRow.nilai)
    } 
    else {
      setDK('')
      setRekening({})
      setNilai(0)
    }

  }

  const handleGridSelectionChange = (row_ids) => {
    console.log(row_ids)
    setSelectedRowIds(row_ids)  
  }

  const handleDKChange = (e) => {
    if(m_editingState!=editingStateEnum.Idle) setDK(e.target.value) 
  } 

  const handleNaikkanClick = emptyFn
  const handleTurunkanClick = emptyFn

  const handleNilaiChange = (e) => {
    if(m_editingState!=editingStateEnum.Idle) setNilai(e.target.value)
  }

  const handleRekeningChange = (e, newValue) => {
    if(m_editingState!=editingStateEnum.Idle) {
      setRekening(newValue)
    }
  }

  return (
  <>
    <input type={"hidden"} id="txt_jurnalId" name="jurnalId" value={m_jurnalId} /> 
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <TextField 
          select
          readOnly={opsi_unitSkpd.length>1}
          value={m_unitSkpd}
          label="Unit SKPD"
          fullWidth
        >
          {opsi_unitSkpd.map((option)=>(
            <MenuItem key={option.kodeUnitSkpd} value={option.kodeUnitSkpd}>
              {option.kodeUnitSkpd} - {option.unitSkpd}
            </MenuItem> 
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} md={2}>
        <TextField 
            name="noBukti"
            label="Nomor Bukti"
            fullWidth
            readOnly
            value={m_nomorBukti}
            variant={"standard"}              
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <TextField label="Tanggal" name="tanggal" fullWidth type={"date"}  variant={"standard"} min={ new Date('2022/01/01')} max={new Date('2022/12/31')}  />
      </Grid>
      <Grid item xs={12} md={2}>
        <FormControl variant={"standard"} fullWidth>
          <InputLabel htmlFor="label_jenis">Jenis jurnal</InputLabel>
          <Select 
              native
              id="subJenis"
              name="subJenis"
              labelId="label_jenis"
              label="Jenis jurnal"
              fullWidth 
              value={m_subJenis}
              readOnly={!isStateNew()}
          >
            <optgroup label="Jurnal Umum">
              <option value="101">Mutasi Aset Keluar</option>
              <option value="102">Mutasi Aset Masuk</option>
              <option value="103">Penghapusan Aset Mekanisme Penjualan di SKPKD</option>
              <option value="104">Penghapusan Aset Mekanisme Hibah</option>
              <option value="105">Penghapusan Aset Mekanisme Lainnya</option>
              <option value="106">Beban dari BTT</option>
              <option value="107">Pembayaran Utang dari BTT</option>
              <option value="108">Aset Tetap / Lainnya dari BTT</option>
              <option value="109">Penerimaan Aset Tetap / Lainnya dari Hibah</option>
              <option value="110">Penerimaan Aset Lancar Non Kas dari Hibah</option>
              <option value="199">Lainnya</option>
            </optgroup>
            <optgroup label="Jurnal Penyesuaian">
              <option value="201">Persediaan Awal</option>
              <option value="202">Persediaan Akhir</option>
              <option value="203">Beban Dibayar Di Muka Awal</option>
              <option value="204">Beban Dibayar Di Muka Akhir</option>
              <option value="205">Pendapatan Diterima Di Muka Awal</option>
              <option value="206">Pendapatan Diterima Di Muka Akhir</option>
              <option value="207">Piutang Awal</option>
              <option value="208">Piutang Akhir</option>
              <option value="209">Utang Awal</option>
              <option value="210">Utang Akhir</option>
            </optgroup> 
            <optgroup label="Jurnal Koreksi">
              <option value="301">Koreksi Belanja</option>
              <option value="302">Reklasifikasi / koreksi kode neraca</option>
              <option value="303">Reklasifikasi KDP ke aset tetap / lainnya</option>
              <option value="304">Koreksi saldo awal aset</option>
              <option value="305">Koreksi saldo awal kewajiban</option>
              <option value="306">Reklasifikasi aset tetap ke aset ekstrakomptabel/aset lancar</option>
              <option value="307">Kapitalisasi belanja operasi</option>
              <option value="308">Koreksi pendapatan antar SKPD</option>
              <option value="309">Inventarisasi aset tetap / lainnya</option>
            </optgroup>
            <optgroup label="Jurnal Penutup">
              <option value="499">Tutup Buku</option>
            </optgroup>
            
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField label="Uraian" name="keterangan" fullWidth  maxRows={3} minRows={2}  variant={"standard"}/>
      </Grid>
    </Grid>
  
    <Box sx={ { my: 2, padding: 2, border: '2px rgb(100, 100, 255) solid'}}>
      <Grid>
        <h3>Rincian Jurnal</h3>
      </Grid>
      <Grid rowSpacing={2} sx={{ height: "100%", py: 1 }} container>
        <Grid container item xs={12} spacing={1} >
          <Grid item xs={12} md={2}>
            <FormControl variant={"standard"} fullWidth>
              <InputLabel id="label_dk">D/K</InputLabel>
              <Select 
                  id="dk"
                  labelId="label_dk"
                  label="D/K"
                  type="number"
                  fullWidth 
                  value={m_dk}
                  onChange={handleDKChange}
                  readOnly={!isStateNew()}
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value="D">D</MenuItem>
                <MenuItem value="K">K</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
                name="kodeRekening"
                fullWidth
                options={ m_dk == 'D' ? opsiRekDebet : opsiRekKredit}
                autoComplete
                renderInput={(params) => <TextField {...params} variant={"standard"} label="Rekening" />}
                getOptionLabel={ option => `${option.kodeRekening} - ${option.rekening}`}
                isOptionEqualToValue={(option, value) => option.kodeRekening === value.kodeRekening }
                readOnly={m_editingState==editingStateEnum.Idle}
                value={m_rekening}
                onChange={handleRekeningChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField 
                id="nilai"
                label="Nilai"
                type="number"
                fullWidth 
                value={m_nilai}
                readOnly={m_editingState==editingStateEnum.Idle}
                onChange={handleNilaiChange}
                variant={"standard"}
            />
          </Grid>
        </Grid>
        <Stack  sx={{ height: "40px" }} spacing={1} direction="row" >
          <Button variant="contained" sx={ isStateIdle() ? {} : { display: "none" } } disabled={disableEdit} onClick={handleAddClick}>Tambah</Button>
          <Button variant="contained" sx={ isStateIdle() ? {} : { display: "none" } } disabled={disableEdit || m_selectedRowIds.length == 0} onClick={handleEditClick}>Edit</Button>
          <Button variant="contained" sx={ isStateIdle() ? {} : { display: "none" } } disabled={disableEdit || m_selectedRowIds.length == 0} onClick={handleDeleteClick}>Hapus</Button>
          <Button variant="contained" sx={ !isStateIdle() ? {} : { display: "none" } } onClick={handleSaveClick}>Simpan</Button>
          <Button variant="contained" sx={ !isStateIdle() ? {} : { display: "none" } } onClick={handleCancelClick}>Batal</Button>
          <Button variant="contained" sx={{ display: /*m_editingState != editingStateEnum.Idle ? */ "none" /* : "inline" */}} onClick={handleNaikkanClick}>Naikkan</Button>
          <Button variant="contained" sx={{ display: /*m_editingState != editingStateEnum.Idle ? */ "none" /* : "inline" */}} onClick={handleTurunkanClick}>Turunkan</Button>
        </Stack>
        <Grid sx={{ minHeight: "400px", overflow: "auto" }} style={{ "pointerEvents": m_editingState == editingStateEnum.Idle ? "auto" : "none", paddingTop: 10, paddingBottom: 10}} container>
          <DataGrid rows={rows} columns={columns} 
            selectionModel={m_selectedRowIds}
            onSelectionModelChange={handleGridSelectionChange} 
            columnVisibilityModel={{ nilai: false, d_k: false }}>
          </DataGrid>
        </Grid>
      </Grid>  
    </Box>
    <Stack spacing={1} direction={"row"}>
      <Button variant="contained" >Tambah</Button>
      <Button variant="contained" >Simpan Jurnal</Button>
    </Stack>
  </>
  )
}

export default RincianJurnal;