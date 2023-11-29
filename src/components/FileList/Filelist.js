import React from "react";
import { useSelector } from "react-redux";
import { filesSelector } from "../../redux/reducers/fileReducer";

const Filelist = () => {
    const { files } = useSelector(filesSelector)
    console.log("files in filelist"+files);
    return (
        <div>
            <h1>Filelist</h1>
            <ol>
                {files.map((f) => (
                    <li key={f}>
                        {f}
                    </li>
                ))}
            </ol>
        </div>

    );
}

export default Filelist;
