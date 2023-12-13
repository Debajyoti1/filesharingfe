import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Filelist from "../../components/FileList/Filelist";
import Upload from "../../components/Upload/Upload";
import { authSelector } from "../../redux/reducers/authReducer";
const Dashboard = () => {
    const { isLoggedIn } = useSelector(authSelector);

    const navigate = useNavigate();

    useEffect(() => {
        console.log('inside Dashboard '+isLoggedIn);
        if (!isLoggedIn) {
            navigate("/signin");
        }
    }, []);
    return (
        <div>
            <h1>Dashboard after login</h1>
            {/* Send actual upload url for logged in user */}
            <Upload />
            <Filelist />
        </div>
    );
}

export default Dashboard;
