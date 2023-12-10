import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authActions } from "./authReducer";
import { API_URL } from "../../configurations/config";

const initialState = {
    files: [],
    fileDetails: [],
    isLoading: true,
}

export const uploadFile = createAsyncThunk(
    'file/uploadFile',
    async ({ upload_url, formData, auth }, thunkAPI) => {

        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${auth}`);
            const response = await fetch(upload_url, {
                method: "POST",
                body: formData,
                headers: headers
            });
            console.log(headers);

            if (response.ok) {
                // File(s) uploaded successfully
                const resbody = await response.json()
                const files = resbody.files
                console.log("Files uploaded!");
                thunkAPI.dispatch(filesActions.add(files))
                console.log(resbody);
            } else {
                console.error("File upload failed.");
            }
        } catch (error) {
            console.error("Error uploading files:", error);
        }
    }
)
export const getFileDetails = createAsyncThunk(
    'file/getFileDetails',
    async (args, thunkAPI) => {

        try {
            // console.log(args);
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
        } catch (error) {
            console.error("Error Fetching files:", error);
        }
    }
)
// Define the habit slice
const filesSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        setAllfiles: (state, action) => {
            state.files = action.payload
            state.isLoading = false
        },
        setAllfileDetails: (state, action) => {
            state.fileDetails = action.payload
            state.isLoading = false
        },
        add: (state, action) => {
            state.files = [action.payload, ...state.files]
        },
        delete: (state, action) => {
            state.files = state.files.filter((habit) =>
                (habit.id !== action.payload)
            );
        },
        update: (state, action) => {
            const { habitId, day, newStatus } = action.payload;

            // Find the habit by ID
            const habitToUpdate = state.files.find((habit) => habit.id === habitId);
            // console.log(habitToUpdate);
            if (habitToUpdate) {
                // Update the status of the specified day
                habitToUpdate.days[day] = newStatus
            }
        },
        setNotification: (state, action) => {
            state.message = true; // Set message flag to true to display a notification
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authActions.login, (state, action) => {
                console.log("After auth login, call from file extra reducer");
                console.log(action.payload.user.files);
                state.files = action.payload.user.files
            })
            .addCase(authActions.logout, (state, action) => {
                console.log("After auth logout, call from file extra reducer");
                state.files = []
                state.fileDetails=[]
                //After logout still it shows details, fix it
            })
    }
});

// Export the File reducer, actions, and selector
export const filesReducer = filesSlice.reducer
export const filesActions = filesSlice.actions
export const filesSelector = (state) => state.filesReducer