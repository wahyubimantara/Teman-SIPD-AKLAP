import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="Anggaran" />
          <Widget type="Pendapatan" />
          <Widget type="Belanja" />
          <Widget type="Jurnal Umum" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Realisasi Belanja" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Realisasi Belanja</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
