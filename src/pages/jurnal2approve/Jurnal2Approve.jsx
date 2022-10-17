import "./jurnal2approve.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Belanja from "../../components/belanja/Belanja";
import TabelPendapatan from "../../components/tabel-pendapatan/Tabel-Pendapatan";



const Jurnal2Approve = () => {
  return (
    <div className="jurnal2approve">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <div className="listContainer2">
          <Belanja />
        </div>
        <div className="listContainer2">
          <TabelPendapatan />
        </div>
     
      </div>
    </div>
  )
}

export default Jurnal2Approve