import React, { useRef, useState } from "react";
import styles from './Upload.module.css';
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../configurations/config";
import { authSelector } from "../../redux/reducers/authReducer";
import { filesSelector, uploadFile } from '../../redux/reducers/fileReducer';

const Upload = () => {
    const dispatch = useDispatch();
    const { isLoggedIn, auth } = useSelector(authSelector);
    const {fileUploadProgress } = useSelector(filesSelector)
    const fileInputRef = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);

    let upload_url = API_URL + "/file" + "/uploadnoauth";
    if (isLoggedIn) {
        upload_url = API_URL + "/file" + "/upload";
    }

    const handleUpload = () => {
        if (selectedFiles.length > 0) {
            const formData = new FormData();

            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append('files', selectedFiles[i]);
            }

            dispatch(uploadFile({ upload_url, formData, auth }));
        } else {
            console.error("No files selected for upload.");
        }
    };

    const handleFileInputChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            setSelectedFiles(Array.from(files));
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length > 0) {
            setSelectedFiles(Array.from(droppedFiles));
        }
    };

    return (
        <div className={styles.fileUpload} onDragOver={handleDragOver} onDrop={handleDrop}>
            <label htmlFor="fileInput" className={styles.fileInputLabel}>
                {selectedFiles.length === 0 ? 'Drag & Drop files here or click to select files' : 'Selected files:'}
            </label>
            {selectedFiles.length > 0 &&
                <ul className={styles.selectedFilesList}>
                    {selectedFiles.map((file, index) => (
                        <li key={index}>{file.name}</li>
                    ))}
                </ul>
            }
            <input
                id="fileInput"
                type="file"
                name="files"
                multiple
                ref={fileInputRef}
                onChange={handleFileInputChange}
                style={{ display: 'none' }}
            />
            <button onClick={handleUpload}>Upload</button>
            {fileUploadProgress > 0 && fileUploadProgress < 100 && (
                <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: `${fileUploadProgress}%` }}>{fileUploadProgress}%</div>
                </div>
            )}
        </div>
    );
};

export default Upload;
