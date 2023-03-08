import React from 'react';
import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';
import './Layout.scss';

const Layout = ({children}) => {
    return (
        <div className="face">
            <Sidebar/>
            <div className="mainContainer">
                <Navbar/>
                <div className="mainContent">
                    {children}            
                </div>       
            </div>
        </div>
    )
}

export default Layout