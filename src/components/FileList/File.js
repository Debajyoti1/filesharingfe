import styles from './Filelist.module.css'
const File = ({ file }) => {
    return <>
        <div className={styles.file}>
            <p>{file.actualName}</p>
            <div className={styles.filebtn}>
                <button className={styles.btn}>Share</button>
                <button className={styles.btn}>Download</button>
                <button className={styles.btn}>Delete</button>
            </div>
        </div>
    </>
}

export default File