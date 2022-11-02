import "./buku-besar.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import SKPD from "../../components/skpd/SKPD"
import TabelBukuBesar from "../../components/tabel-buku-besar/TabelBukuBesar";


const BukuBesar = () => {
  return (
    <div className="buku-besar">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <div className="listContainer2">
          <SKPD />
        </div>
        <div className="listContainer2">
          <div className="listTitle">Tabel Hasil</div>
          <TabelBukuBesar></TabelBukuBesar>
        </div>
      </div>
    </div>
  )
}

export default BukuBesar