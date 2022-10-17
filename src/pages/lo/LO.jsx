import "./lo.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Card from "../../components/card/Card";



const LO = () => {
  return (
    <div className="lo">
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

export default LO