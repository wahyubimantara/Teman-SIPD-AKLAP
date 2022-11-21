import "./tabel-pendapatan.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@mui/material";

const TabelPendapatan = () => {
  // const [data, setData] = useState(userRows);

  const columns = [
    { field: 'id', headerName: 'Nomor Jurnal', width: 350 },
    { field: 'DokumenSumber', headerName: 'Dokumen Sumber', width: 300 },
    { field: 'tanggal', headerName: 'Tanggal', width: 150 },
    {
      field: 'nilai',
      headerName: 'Nilai',
      type: 'number',
      width: 200,
    },
    { field: 'keperluan', headerName: 'Keperluan', width: 200 },
   
  ];
  
  const rows = [
    { id: '35.06/11.0/078081/JUR-BLJ/SP2D-GU/7.01.0.00.0.00.44.0000/10/2022', DokumenSumber: '05.09/04.0/000007/GU/7.01.0.00.0.00.44.0000/P.04/10/2022', tanggal: '14/10/2022', nilai: 35, keperluan: 'Percobaan1' },
    { id: '35.06/11.0/078082/JUR-BLJ/SP2D-LS/7.01.0.00.0.00.44.0000/10/2022', DokumenSumber: '05.09/04.0/000033/LS/7.01.0.00.0.00.44.0000/P.04/10/2022', tanggal: '14/10/2022', nilai: 42, keperluan: 'Percobaan2' },
 
  ];

  const [data, setData] = useState(rows);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleView = (id) => {
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
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">Lihat</div>
            </Link>

            <div
              className="approveButton"
              onClick={() => handleView(params.row.id)}
            >
              Approve
            </div>

            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Reject
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable" sx={{}}>
      <div className="datatableTitle">
        Tabel Jurnal to Approve
        <Button className="approve">
          Selected Approve
        </Button>
      </div>
      <DataGrid
        className="datagrid"
        rows={rows}
        columns={columns.concat(actionColumn)}
        // pageSize={9}
        // rowsPerPageOptions={[9]}
        checkboxSelection
      />
      {/* <TablePagination rowsPerPageOptions={[10, 50]} /> */}

    </div>
  );
};

export default TabelPendapatan;
