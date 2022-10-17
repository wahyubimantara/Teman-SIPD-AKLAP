import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Featured = () => {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Transaksi SKPD </h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"xx%"} strokeWidth={5} />
        </div>
        <p className="title">Total Transaksi SKPD Bulan ini</p>
        <p className="amount">Rp xx</p>
        <p className="desc">
          Proses transaksi sampai dengan bulan lalu, bulan ini, sampai dengan bulan ini
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">s.d. bulan lalu</div>
            <div className="itemResult positive">
              <KeyboardArrowDownIcon fontSize="small"/>
              <div className="resultAmount">Rp xx</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Bulan ini</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">Rp xx</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">s.d. bulan ini</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">Rp xx</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
