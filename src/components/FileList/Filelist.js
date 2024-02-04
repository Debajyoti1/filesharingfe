import React, { useEffect, useState } from "react";
import styles from './Filelist.module.css';
import { useDispatch, useSelector } from "react-redux";
import { filesSelector, getFileDetails } from "../../redux/reducers/fileReducer";
import File from "./File";
import Loader from "../Loader/Loader";

const Filelist = () => {
    const dispatch = useDispatch();
    const { files, fileDetails, isLoading } = useSelector(filesSelector);

    const [page, setPage] = useState(1);
    const pageSize = 10; // Number of items per page

    // Calculate total number of pages based on the number of files and page size
    const totalPages = Math.ceil(files.length / pageSize);

    useEffect(() => {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const filesForPage = files.slice(startIndex, endIndex);

        dispatch(getFileDetails(filesForPage));
        console.log('fetching again all filedetails data');
        console.log(files);
        console.log(fileDetails)
        console.log('Data fetch completed');
    }, [files, page, pageSize]);

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <div className={styles.filelistdiv}>
            <h1>Filelist</h1>
            {isLoading ? (
                <Loader />
            ) : (
                <div className={styles.filelist}>
                    {fileDetails.map((f) => 
                        <File key={f._id} file={f} />
                    )}
                </div>
            )}
            {
                files.length === 0 ? ('') : (
                    <div className={styles.pagination}>
                        <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
                        <span>Page {page} of {totalPages} pages</span>
                        <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
                    </div>
                )}
        </div>
    );
}

export default Filelist;
