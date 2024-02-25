import React from "react";
import Upload from "../../components/Upload/Upload";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, authSign } from "../../redux/reducers/authReducer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Filelist from "../../components/FileList/Filelist";

const Landing = () => {
  const dispatch = useDispatch();

  const { isLoggedIn, loadingAuth } = useSelector(authSelector);

  const navigate = useNavigate();

  useEffect(() => {
    console.log('inside landing ' + isLoggedIn);
    if (isLoggedIn) {
      navigate("/dashboard");
    }
    else {
      dispatch(authSign())
    }
  }, [isLoggedIn]);
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "10px" }}>Welcome to File Sharing Application<br />Created and Maintained by Debajyoti Dutta</h1>
      <Upload />
      <Filelist />
    </div>
  );
}

export default Landing;
