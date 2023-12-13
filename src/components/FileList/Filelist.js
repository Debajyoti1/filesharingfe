import React, { useEffect } from "react";
import styles from './Filelist.module.css'
import { useDispatch, useSelector } from "react-redux";
import { filesSelector, getFileDetails } from "../../redux/reducers/fileReducer";
import File from "./File";
import Loader from "../Loader/Loader";
const Filelist = () => {
    const dispatch = useDispatch();
    const { files, fileDetails,isLoading } = useSelector(filesSelector);

    useEffect(() => {
        if (files && files.length > 0) {
            dispatch(getFileDetails(files));
        }
        console.log(fileDetails);
    }, [files]);

    return (
        <div className={styles.filelistdiv}>
            <h1>Filelist</h1>
            {isLoading ? (<Loader />):(
            <div className={styles.filelist}>
                {fileDetails.map((f) => (
                        <File key={f._id} file={f} />
                ))}
            </div>
            )}
        </div>
    );
}

export default Filelist;
