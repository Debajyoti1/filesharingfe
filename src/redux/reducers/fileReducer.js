import axios from 'axios';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authActions } from "./authReducer";
import { API_URL } from "../../configurations/config";

const initialState = {
    files: [],
    fileDetails: [],
    isLoading: false,
    fileInfo: null,
    fileUploadProgress: 0
}


export const uploadFile = createAsyncThunk(
    'file/uploadFile',
    async ({ upload_url, formData, auth }, thunkAPI) => {
        try {
            const headers = {
                Authorization: `Bearer ${auth}`,
                'Content-Type': 'multipart/form-data', // Ensure this content type for FormData
            };

            const axiosConfig = {
                headers: headers,
                onUploadProgress: (progressEvent) => {
                    // if (progressEvent.lengthComputable) {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    thunkAPI.dispatch(filesActions.setFileUploadProgress(percentCompleted))
                    console.log(progressEvent);
                    // }
                },
            };

            const response = await axios.post(upload_url, formData, axiosConfig);

            if (response.status === 200) {
                // File(s) uploaded successfully
                const files = response.data.files;
                console.log("Files uploaded!");
                thunkAPI.dispatch(filesActions.add(files));
                console.log(response.data);
            } else {
                console.error("File upload failed.");
            }
        } catch (error) {
            console.error("Error uploading files:", error);
        }
    }
);

export const deleteFile = createAsyncThunk(
    'file/deleteFile',
    async ({ fileId, auth }, thunkAPI) => {
        // console.log(fileId, auth);
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${auth}`);
            headers.append('Content-Type', 'application/json');
            const data = { "id": fileId }
            const response = await fetch(API_URL + '/file/delete', {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data)
            });

            // console.log(headers);

            if (response.ok) {
                // File deleted successfully
                const resbody = await response.json()
                thunkAPI.dispatch(filesActions.delete(fileId))
                console.log(resbody);
            } else {
                console.log(await response.json());
                console.error("File delete failed.");
            }
        } catch (error) {
            console.error("Error deleting files:", error);
        }
    }
)
export const getFileDetails = createAsyncThunk(
    'file/getFileDetails',
    async (args, thunkAPI) => {

        try {
            // console.log(args);
            thunkAPI.dispatch(filesActions.setLoading(true))
            const data = { 'files': args }
            const response = await fetch(API_URL + '/file/info', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                // File(s) uploaded successfully
                const resbody = await response.json()
                console.log(resbody);
                thunkAPI.dispatch(filesActions.setAllfileDetails(resbody.fileDetails))
            } else {
                console.error("Files Fetch failed.");
            }
            thunkAPI.dispatch(filesActions.setLoading(false))

        } catch (error) {
            console.error("Error Fetching files:", error);
            thunkAPI.dispatch(filesActions.setLoading(false))

        }
    }
)
export const getAFileInfo = createAsyncThunk(
    'file/getAFileInfo',
    async (args, thunkAPI) => {

        try {
            // console.log(args);
            thunkAPI.dispatch(filesActions.setLoading(true))
            const response = await fetch(API_URL + '/file/info/' + args, {
                method: "GET",
            });

            if (response.ok) {
                // File(s) uploaded successfully
                const resbody = await response.json()
                console.log(resbody);
                thunkAPI.dispatch(filesActions.setAFileInfo(resbody.message))
            } else {
                console.error("File info Fetch failed.");
            }
            thunkAPI.dispatch(filesActions.setLoading(false))
        } catch (error) {
            console.error("Error Fetching files:", error);
            thunkAPI.dispatch(filesActions.setLoading(false))
        }
    }
)

// Define the file slice
const filesSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setAllfiles: (state, action) => {
            state.files = action.payload
            state.isLoading = false
        },
        setAllfileDetails: (state, action) => {
            state.fileDetails = action.payload
            state.isLoading = false
        },
        setAFileInfo: (state, action) => {
            state.fileInfo = action.payload
            state.isLoading = false
        },
        add: (state, action) => {
            state.files = [action.payload, ...state.files]
        },
        delete: (state, action) => {
            state.files = state.files.filter((file) =>
                (file !== action.payload)
            );
        },
        setFileUploadProgress: (state, action) => {
            state.fileUploadProgress = action.payload
        },
        setNotification: (state, action) => {
            state.message = true; // Set message flag to true to display a notification
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authActions.login, (state, action) => {
                console.log("After auth login, call from file extra reducer");
                console.log(action.payload.user.files.length);
                state.files = action.payload.user.files
            })
            .addCase(authActions.logout, (state, action) => {
                console.log("After auth logout, call from file extra reducer");
                state.files = []
                state.fileDetails = []
            })
    }
});

// Export the File reducer, actions, and selector
export const filesReducer = filesSlice.reducer
export const filesActions = filesSlice.actions
export const filesSelector = (state) => state.filesReducer
