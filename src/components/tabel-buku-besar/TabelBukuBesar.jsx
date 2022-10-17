import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {
  const rows = [
    {
      id: 1143155,
      tanggal: "Acer Nitro 5",
      uraian: "John Smith",
      ref: "1 March",
      debit: 785,
      kredit: "Cash on Delivery",
      saldo: "Approved",
    },
    {
      id: 2235235,
      tanggal: "Playstation 5",
      uraian: "Michael Doe",
      ref: "1 March",
      debit: 900,
      kredit: "Online Payment",
      saldo: "Pending",
    },
    {
      id: 2342353,
      tanggal: "Redragon S101",
      uraian: "John Smith",
      ref: "1 March",
      debit: 35,
      kredit: "Cash on Delivery",
      saldo: "Pending",
    },
    {
      id: 2357741,
      tanggal: "Razer Blade 15",
      uraian: "Jane Smith",
      ref: "1 March",
      debit: 920,
      kredit: "Online",
      saldo: "Approved",
    },
    {
      id: 2342355,
      tanggal: "ASUS ROG Strix",
      uraian: "Harold Carol",
      ref: "1 March",
      debit: 2000,
      kredit: "Online",
      saldo: "Pending",
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Tanggal</TableCell>
            <TableCell className="tableCell">Uraian</TableCell>
            <TableCell className="tableCell">Ref</TableCell>
            <TableCell className="tableCell">Debit</TableCell>
            <TableCell className="tableCell">Kredit</TableCell>
            <TableCell className="tableCell">Saldo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">{row.tanggal}</TableCell>
              <TableCell className="tableCell">{row.uraian}</TableCell>
              <TableCell className="tableCell">{row.ref}</TableCell>
              <TableCell className="tableCell">{row.debit}</TableCell>
              <TableCell className="tableCell">{row.kredit}</TableCell>
              <TableCell className="tableCell">
                <span className={`saldo ${row.saldo}`}>{row.saldo}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
