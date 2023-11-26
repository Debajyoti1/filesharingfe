import React, { useEffect } from "react";
import Upload from "../../components/Upload/Upload";
import Filelist from "../../components/FileList/Filelist";
const Dashboard = () => {
    useEffect(()=>{
        
    })
    return (
        <div>
            <h1>Dashboard after login</h1>
            <Upload />
            <Filelist />
        </div>
    );
}

export default Dashboard;
