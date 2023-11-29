import React, { useState, useRef } from "react";
import { API_URL } from "../../configurations/config";
import { useDispatch, useSelector } from "react-redux";
import { filesActions, uploadFile } from '../../redux/reducers/fileReducer'
import { authSelector } from "../../redux/reducers/authReducer";
const Upload = () => {
    const dispatch = useDispatch()
    const { isLoggedIn, auth } = useSelector(authSelector)
    const fileInputRef = useRef(null);
    let upload_url = API_URL + "/file" + "/uploadnoauth";
    if (isLoggedIn) {
        upload_url = API_URL + "/file" + "/upload"
    }


    const handleUpload = async () => {
        if (fileInputRef.current.files) {
            const formData = new FormData();

            for (let i = 0; i < fileInputRef.current.files.length; i++) {
                formData.append('files', fileInputRef.current.files[i]);
            }
            dispatch(uploadFile({ upload_url, formData, auth }))
        } else {
            console.error("No files selected for upload.");
        }
    };

    return (
        <div>
            <input
                type="file"
                name="files"
                multiple
                ref={fileInputRef}
            />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default Upload;
