import "./jurnalumum.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import ComponenJurnalUmum from "../../components/componenJurnalUmum/ComponenJurnalUmum"
import TabelJurnalUmum from "../../components/tabel-jurnal-umum/Tabel-Jurnal-Umum"




const JurnalUmum = () => {
  return (
    <div className="jurnalumum">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <div className="listContainer2">
          <ComponenJurnalUmum />
        </div>
        <div className="listContainer2">
          <TabelJurnalUmum />
        </div>
     
      </div>
    </div>
  )
}

export default JurnalUmum