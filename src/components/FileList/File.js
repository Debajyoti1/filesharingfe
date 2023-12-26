import { useDispatch, useSelector } from 'react-redux';
import styles from './Filelist.module.css'
import { authSelector } from '../../redux/reducers/authReducer';
import { deleteFile } from '../../redux/reducers/fileReducer';
const File = ({ file }) => {
    const dispatch = useDispatch();
    const { auth } = useSelector(authSelector);
    const handleDelete=()=>{
        const fileId=file._id
        dispatch(deleteFile({fileId,auth}))
    }
    return <>
        <div className={styles.file}>
            <p>{file.actualName}</p>
            <div className={styles.filebtn}>
                <button className={styles.btn}>Share</button>
                <button className={styles.btn}>Download</button>
                {auth?(<button className={styles.btn} onClick={handleDelete}>Delete</button>):''}
            </div>
        </div>
    </>
}

export default File