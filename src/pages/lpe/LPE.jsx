import "./lpe.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Card from "../../components/card/Card";



const LPE = () => {
  return (
    <div className="lpe">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <div className="listContainer2">
          <Card />
        </div>
        <div className="listContainer2">
          
        </div>
     
      </div>
    </div>
  )
}

export default LPE