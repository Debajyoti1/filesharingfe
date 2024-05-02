import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { authSign } from '../../redux/reducers/authReducer';
import { filesSelector, getAFileInfo } from "../../redux/reducers/fileReducer";
import Loader from '..//../components/Loader/Loader';
import styles from './Download.module.css';
import { BACKEND_API_URL } from '../../configurations/config';

const Download = () => {
    const { fileId } = useParams();
    const dispatch = useDispatch();

    const { isLoading, fileInfo } = useSelector(filesSelector);

    useEffect(() => {
        dispatch(authSign());
        dispatch(getAFileInfo(fileId));
    }, [dispatch, fileId]);
    const handleDownload=()=>{
        const downloadLink=BACKEND_API_URL+'/file/download/'+fileId
        window.open(downloadLink, '_blank');
    }
    return (
        <div className={styles.container}>
            {isLoading ? (
                <Loader />
            ) : fileInfo ? (
                <div className={styles.downloadcard}>
                    <p>File ID: {fileId}</p>
                    <p className={styles.fileName}>File Name: {fileInfo.actualName}</p>
                    <p className={styles.uploadedBy}>
                        Uploaded by <b> {fileInfo.user.name} </b> on {new Date(fileInfo.createdAt).toLocaleString()}
                    </p>
                    <button className={styles.button} onClick={handleDownload}>Download</button>
                </div>
            ) : (
                <div className={styles.downloadcard}>
                    <p className={styles.errorMsg}>File not found</p>
                </div>
            )}
        </div>
    );
};

export default Download