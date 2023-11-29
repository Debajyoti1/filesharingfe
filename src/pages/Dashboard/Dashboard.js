import React, { useEffect } from "react";
import Upload from "../../components/Upload/Upload";
import Filelist from "../../components/FileList/Filelist";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, authSign } from "../../redux/reducers/authReducer";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
    const dispatch = useDispatch();

    const { isLoggedIn, loadingAuth } = useSelector(authSelector);

    const navigate = useNavigate();

    // useEffect(() => {
    //     dispatch(authSign())
    // }, [])

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
