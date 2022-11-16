import "./tabel-jurnal-umum.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { Button } from "@mui/material";
import ApprovalIcon from "@mui/icons-material/Approval";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
const TabelJurnalUmum = () => {
const columns = [
  { field: 'id', headerName: 'Kode Rekening', width: 200 },
  { field: 'nama_rekening', headerName: 'Nama Rekening', width: 500 },
  
  {
    field: 'debit',
    headerName: 'Debit',
    type: 'number',
    width: 250,
  },

  {
    field: 'kredit',
    headerName: 'Kredit',
    type: 'number',
    width: 250,
  },
  
];
const rows = [
  { id: '1.1.01.02.01.0001', nama_rekening: 'Kas di Bendahara Penerimaan', debit: 100, kredit: 0 },
  { id: '1.1.01.03.01.0001', nama_rekening: 'Kas di Bendahara Pengeluaran', debit: 100, kredit: 0 },
  
];

const [data, setData] = useState(rows);
const handleDelete = (id) => {
  setData(data.filter((item) => item.id !== id));
};

const actionColumn = [
  {
    field: "action",
    headerName: "Action",
    width: 220,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <div
            className="deleteButton"
            onClick={() => handleDelete(params.row.id)}
          >
            Hapus
          </div>
        </div>
      );
    },
  },
];

  return (
    <div className="datatable">
        <div>
        <Button
            sx={{ "margin-left": 10, float: "right" }}
            variant="contained"
            endIcon={<ApprovalIcon />}
          >
            Simpan
          </Button>
          <Button
            sx={{ float: "right" }}
            variant="contained"
            color="error"
            startIcon={<DeleteOutlineIcon />}
          >
            Batal
          </Button>
        </div>
      <div className="datatableTitle">
        Tabel Jurnal Umum
      </div>
      <DataGrid
        className="datagrid"
        rows={rows}
        columns={columns.concat(actionColumn)}
        checkboxSelection
      />
    </div>
  );


};

export default TabelJurnalUmum;