import { useDispatch, useSelector } from 'react-redux';
import styles from './Filelist.module.css'
import { authSelector } from '../../redux/reducers/authReducer';
import { deleteFile } from '../../redux/reducers/fileReducer';
const File = ({ file }) => {
    const dispatch = useDispatch();
    const { auth } = useSelector(authSelector);
    const handleDelete = () => {
        const fileId = file._id
        dispatch(deleteFile({ fileId, auth }))
    }
    const handleDownload = () => {
        window.open('/download/' + file._id, '_blank')
    }
    const handleShare = async () => {
        try {
            // Use the Clipboard API to write the content to the clipboard
            await navigator.clipboard.writeText(window.location.origin+'/download/'+file._id);
            
            // Optionally, provide some user feedback (e.g., notification or console log)
            // console.log('Content copied to clipboard:', contentToCopy);
        } catch (error) {
            // Handle any errors that might occur during copying
            console.error('Error copying to clipboard:', error);
            // You can provide user feedback about the error here
        }
    }
    return <>
        <div className={styles.file}>
            <p>{file.actualName}</p>
            <div className={styles.filebtn}>
                <button className={styles.btn} onClick={handleShare}>Share</button>
                <button className={styles.btn} onClick={handleDownload}>Download</button>
                {auth ? (<button className={styles.btn} onClick={handleDelete}>Delete</button>) : ''}
            </div>
        </div>
    </>
}

export default File