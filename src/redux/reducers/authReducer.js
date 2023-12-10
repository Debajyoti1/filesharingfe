import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from '../../configurations/config'


const initialState = {
    isLoggedIn: false,
    user: null,
    auth: null,
    message: true,
    loadingAuth: false,
};

//This function runs once to load user auth from localstorage
export const authSign = createAsyncThunk(
    'auth/authSign',
    async (args, thunkAPI) => {
        const auth = localStorage.getItem('auth')
        console.log('auth sign thunk => ' + auth);
        if (auth) {
            try {
                thunkAPI.dispatch(authActions.setLoading(true));
                const response = await fetch(API_URL + '/user/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + auth
                        // Add any other headers as needed
                    },
                    // body: JSON.stringify(args),
                });
                // Check if the request was successful
                if (response.ok) {
                    const resbody = await response.json()
                    const user = resbody.user
                    thunkAPI.dispatch(authActions.login({ user, auth }))
                    console.log(user)
                }
                else {
                    console.error('Login failed.');
                    thunkAPI.dispatch(authActions.setLoading(false))
                }
            } catch (error) {
                console.error('Error:', error);
                thunkAPI.dispatch(authActions.setLoading(false))
            }
        }
    }
)
export const signIn = createAsyncThunk(
    'auth/signIn',
    async (args, thunkAPI) => {
        thunkAPI.dispatch(authActions.setLoading(true));

        try {
            // Make a POST request to your API endpoint
            const response = await fetch(API_URL + '/user/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other headers as needed
                },
                body: JSON.stringify(args),
            });
            // Check if the request was successful
            if (response.ok) {
                const resbody = await response.json()
                const auth = resbody.data.token
                console.log(response.status, auth, resbody.data.user);
                localStorage.setItem('auth', auth)
                console.log('Login successful!');
                const user = resbody.data.user
                thunkAPI.dispatch(authActions.login({ user, auth }))
                // You can handle the successful login here
            } else {
                console.error('Login failed.');
                thunkAPI.dispatch(authActions.setLoading(false))
                // You can handle the failed login here
            }
        } catch (error) {
            console.error('Error:', error);
            thunkAPI.dispatch(authActions.setLoading(false))
            // Handle any network or API errors here
        }
    }
);

export const signOut=createAsyncThunk(
    'auth/signOut',
    async(args,thunkAPI)=>{
        try{
            localStorage.removeItem('auth')
            thunkAPI.dispatch(authActions.logout())
        }
        catch (error) {
            console.error('Error:', error);
            // Handle any network or API errors here
        }
    }
)


// Define the auth slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loadingAuth = action.payload;
        },
        login: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.user;
            state.auth = action.payload.auth
            state.loadingAuth = false;
        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
            state.auth = null
            state.loadingAuth = false;
        },
        setNotification: (state, action) => {
            state.message = true;
        },
    },
});

// Export the Auth reducer, actions, and selector
export const authReducer = authSlice.reducer
export const authActions = authSlice.actions
export const authSelector = (state) => state.authReducer
