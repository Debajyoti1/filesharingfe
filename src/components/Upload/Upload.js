import React, { useState, useRef } from "react";
import { API_URL } from "../../configurations/config";

const Upload = () => {
    const fileInputRef = useRef(null);
    const upload_url = API_URL + "/file" + "/uploadnoauth";

    const handleUpload = async () => {
        if (fileInputRef.current.files) {
            const formData = new FormData();

            for (let i = 0; i < fileInputRef.current.files.length; i++) {
                formData.append('files', fileInputRef.current.files[i]);
            }

            try {
                const response = await fetch(upload_url, {
                    method: "POST",
                    body: formData,
                });
                console.log(formData);

                if (response.ok) {
                    // File(s) uploaded successfully
                    console.log("Files uploaded!");
                } else {
                    console.error("File upload failed.");
                }
            } catch (error) {
                console.error("Error uploading files:", error);
            }
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
