import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Autocomplete, Button, FormControl, Grid, InputLabel, Menu, MenuItem, Paper, Select, TextField } from "@mui/material";
import ApprovalIcon from "@mui/icons-material/Approval";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import "./tabel-jurnal.scss"
import { Stack } from "@mui/system";
import numberFormat from "../../service/numberFormat";
import { setNestedObjectValues } from "formik";

const RincianJurnal = (props) => {
  const emptyFn = () => {}
  const emptyArrayFn = async () => []
  const columnId = props.columnId || "id"
  const onDataChange = props.onDataChange || emptyFn
  const rekeningDebetGetter = props.fnRekeningD || emptyArrayFn
  const rekeningKreditGetter = props.fnRekeningK || emptyArrayFn
  const disableEdit = !!props.disableEdit;
  
  const opsi_rekening = [
    { kodeRekening: '1.1', rekening: 'Aset Lancar' },
    { kodeRekening: '1.2', rekening: 'Aset sss' },
    { kodeRekening: '1.3', rekening: 'Aset s3' }
  ]

  let [rows, setRows] = useState( props.rows || [
    { id: 1, kodeRekening: opsi_rekening[0].kodeRekening, rekening: opsi_rekening[0].rekening, d_k: 'K', nilai: 1500},
    { id: 2, kodeRekening: opsi_rekening[1].kodeRekening, rekening: opsi_rekening[1].rekening, d_k: 'D', nilai: 12345678901.23},
    { id: 3, kodeRekening: opsi_rekening[2].kodeRekening, rekening: opsi_rekening[2].rekening, d_k: 'D', nilai: 1500},
    { id: 4, kodeRekening: opsi_rekening[0].kodeRekening, rekening: opsi_rekening[0].rekening, d_k: 'D', nilai: 1500},
    { id: 5, kodeRekening: opsi_rekening[2].kodeRekening, rekening: opsi_rekening[2].rekening, d_k: 'D', nilai: 1500},
  ]);

  const columns = [
    { field: "id", headerName: "No Urut", editable: false, sortable: false, hideable: false, filterable: false, minWidth: 40 },
    { field: "kodeRekening", headerName: "Kode Rekening", sortable: false, editable: false, hideable: false, filterable: false, minWidth: 140 },
    { field: "rekening", headerName: "Rekening", sortable: false, editable: false, hideable: false, filterable: false, minWidth: "500", flex: 1 },
    { field: "d_k", headerName: "D/K", sortable: false, editable: false, hideable: false, filterable: false, width: 30 },
    { 
      field: "nilai", 
      headerName: "Nilai", 
      type: "number", 
      editable: false, 
      hideable: false,
      filterable: false, 
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
  const [m_editingState, setEditingState] = useState(editingStateEnum.Idle) 
  const [selectedRowIds, setSelectedRowIds] = useState(rows.length > 0 ? [rows[0].id] : [])
  const [editedRow, setEditedRow] = useState({})
  
  /// Component data
  const [opsiRekDebet, setOpsiRekDebet] = useState([])
  const [opsiRekKredit, setOpsiRekKredit] = useState([])

  const [m_dk, setDK] = useState('D')
  const [m_rekening, setRekening] = useState({})
  const [m_nilai, setNilai] = useState(0.0)
  const [m_status, setStatus] = useState(0)

  useEffect(()=>{
    rekeningDebetGetter().then(data=>setOpsiRekDebet(data))
    rekeningKreditGetter().then(data=>setOpsiRekKredit(data))
  }, [])
  
  useEffect(()=>{
    if(selectedRowIds.length>0) {
      const selected = rows.filter(x=>x[columnId]==selectedRowIds[0])

      if(selected.length>0) {
        setDK(selected[0].d_k)
        setRekening({kodeRekening: selected[0].kodeRekening, rekening: selected[0].rekening})
        setNilai(selected[0].nilai)
      }
      else {
        setDK('')
        setRekening({})
        setNilai(0)
      }
    }
  }, [selectedRowIds])
  
  const handleAddClick = () => {
    const selected = rows.filter(v=>v[columnId] == selectedRowIds[0]) 
    setEditedRow(selected[0])

    setDK('')
    setRekening({})
    setNilai(0)

    setEditingState(editingStateEnum.New)
  }

  const handleEditClick = () => {
    const selected = rows.filter(v=>v[columnId] == selectedRowIds[0]) 
    setEditedRow(selected[0])
    setEditingState(editingStateEnum.Edit) 
  }

  const handleDeleteClick = () => { 
    let i = 1
    let tempRows = rows
      .filter(v=> v[columnId] != selectedRowIds[0])
      .map(row=>{ row[columnId] = i++; return row; })
    setRows(tempRows)
  }

  const handleSaveClick = () => {
    let tempRows;
    if(m_editingState == editingStateEnum.Edit) {
      tempRows = rows.map(x=>{
        if(x[columnId]==editedRow[columnId]) {
          x.rekening = m_rekening.rekening
          x.kodeRekening = m_rekening.kodeRekening
          x.nilai = m_nilai
          x.d_k = m_dk
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
    setSelectedRowIds([newRow[columnId]])
    setEditingState(editingStateEnum.Idle)
  }

  const handleCancelClick = () => {
    setEditingState(editingStateEnum.Idle) 
  }

  const handleGridSelectionChange = (row_ids) => {
    setSelectedRowIds(row_ids)  
  }

  const handleDKChange = (e) => {
    if(m_editingState!=editingStateEnum.Idle) setDK(e.target.value) 
  } 

  const handleNilaiChange = (e) => {
    if(m_editingState!=editingStateEnum.Idle) setNilai(e.target.value)
  }

  const handleRekeningChange = (e) => {
    if(m_editingState!=editingStateEnum.Idle) setRekening(e.target.value)
  }

  return (
  <Grid rowSpacing={2} sx={{ height: "100%" }} style={{ paddingTop: 10, paddingLeft: 5, paddingRight: 5, paddingBottom: 10  }} container>
    <Grid container item xs={12} spacing={1} >
      <Grid item xs={12} md={2}>
        <FormControl fullWidth>
          <InputLabel id="label_dk">D/K</InputLabel>
          <Select 
              id="dk"
              labelId="label_dk"
              label="D/K"
              type="number"
              fullWidth 
              value={m_dk}
              onChange={handleDKChange}
              readOnly={m_editingState==editingStateEnum.Idle}
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
            options={opsi_rekening}
            autoComplete
            renderInput={(params) => <TextField {...params} label="Rekening" />}
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
        />
      </Grid>
    </Grid>
    <Stack style={{ height: "40px" }} spacing={1} direction="row" >
      <Button variant="contained" sx={{ display: m_editingState != editingStateEnum.Idle ? "none" : "inline"}} disabled={disableEdit} onClick={handleAddClick}>Tambah</Button>
      <Button variant="contained" sx={{ display: m_editingState != editingStateEnum.Idle ? "none" : "inline"}} disabled={disableEdit || selectedRowIds.length == 0} onClick={handleEditClick}>Edit</Button>
      <Button variant="contained" sx={{ display: m_editingState != editingStateEnum.Idle ? "none" : "inline"}} disabled={disableEdit || selectedRowIds.length == 0} onClick={handleDeleteClick}>Hapus</Button>
      <Button variant="contained" sx={{ display: m_editingState == editingStateEnum.Idle ? "none" : "inline"}} onClick={handleSaveClick}>Simpan</Button>
      <Button variant="contained" sx={{ display: m_editingState == editingStateEnum.Idle ? "none" : "inline"}} onClick={handleCancelClick}>Batal</Button>
      <Button variant="contained" sx={{ display: m_editingState != editingStateEnum.Idle ? "none" : "inline"}} onClick={handleNaikkanClick}>Naikkan</Button>
      <Button variant="contained" sx={{ display: m_editingState != editingStateEnum.Idle ? "none" : "inline"}} onClick={handleTurunkanClick}>Turunkan</Button>
    </Stack>
    <Grid sx={{ minHeight: "400px", overflow: "auto" }} style={{ "pointerEvents": m_editingState == editingStateEnum.Idle ? "auto" : "none", paddingTop: 10, paddingBottom: 10}} container>
      <DataGrid rows={rows} columns={columns} 
        selectionModel={selectedRowIds}
        onSelectionModelChange={handleGridSelectionChange} >

      </DataGrid>
    </Grid>
    <Stack direction={"row"}>
      <Button>Simpan dan Tutup</Button>
    </Stack>
  </Grid>
  )
}

export default RincianJurnal;