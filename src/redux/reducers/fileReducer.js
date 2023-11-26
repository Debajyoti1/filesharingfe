import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    habits: [],
    isLoading: true,
}

// Async action to fetch all habits
export const fetchAllhabits = createAsyncThunk(
    'habit/fetchAllhabits',
    async (args, thunkAPI) => {
        if (args.length === 0) { // Check if habits are empty
            console.log('empty habits');
            try {
                thunkAPI.dispatch(habitsActions.setAllhabits([]));
                // thunkAPI.dispatch(habitsActions.setNotification({ success: 'habits fetched' }));
            } catch (error) {
                console.log(error);
                thunkAPI.dispatch(habitsActions.setAllhabits([]));
                thunkAPI.dispatch(habitsActions.setNotification({ error: 'Unable to fetch habits' }));
            }
        } else {
            // No need to fetch, habits already exist
            console.log('empty no');

            return args;
        }
    }
);

// Async action to add a new habit
export const addHabit = createAsyncThunk(
    'habit/addHabit',
    async (args, thunkAPI) => {
        try {
            console.log(args);
            const habit = {
            }
            habit.id = Math.floor(Date.now() / 1000)
            habit.title = args
            console.log(habit);
            habit.days = {}
            for (let ind = 7; ind > 0; ind--) {
                const epochTimeInSeconds = Math.floor((new Date().getTime() - 24 * 60 * 60 * 1000 * ind) / 1000);
                // Push the dayObject into the habit.days
                habit.days[epochTimeInSeconds] = 'None'
            }
            console.log(habit);
            thunkAPI.dispatch(habitsActions.add(habit));
            thunkAPI.dispatch(habitsActions.setNotification({ success: 'Habit added' }));
        } catch (error) {
            console.log(error);
            thunkAPI.dispatch(habitsActions.setNotification({ error: 'Unable to Add Habit' }));
            return;
        }
    }
);

// Async action to update the status of a habit for a specific day
export const updateHabitStatus = createAsyncThunk(
    'habit/updateHabitStatus',
    async (args, thunkAPI) => {
        try {
            // Payload should contain habitId, day, and newStatus

            // Dispatch the updated habit to the Redux store
            thunkAPI.dispatch(habitsActions.update(args));

            // You can also dispatch a success notification if needed
            thunkAPI.dispatch(habitsActions.setNotification({ success: 'Habit updated' }));
        }
        catch (error) {
            console.error(error);
            // Dispatch an error notification if the update fails
            thunkAPI.dispatch(habitsActions.setNotification({ error: 'Unable to update habit' }));
            throw error; // Propagate the error for error handling in components
        }
    }
);



// Async action to delete an habit
export const deleteHabit = createAsyncThunk(
    'habit/deleteHabit',
    async (args, thunkAPI) => {
        try {

            thunkAPI.dispatch(habitsActions.delete(args))
            thunkAPI.dispatch(habitsActions.setNotification({ success: 'Habit Deleted' }));
        } catch (error) {
            console.log(error);
            thunkAPI.dispatch(habitsActions.setNotification({ error: 'Unable to Delete Habit' }));
        }
    }
);

// Define the habit slice
const habitsSlice = createSlice({
    name: 'habit',
    initialState,
    reducers: {
        setAllhabits: (state, action) => {
            state.habits = action.payload
            state.isLoading = false
        },
        add: (state, action) => {
            state.habits = [action.payload, ...state.habits]
        },
        delete: (state, action) => {
            state.habits = state.habits.filter((habit) =>
                (habit.id !== action.payload)
            );
        },
        update: (state, action) => {
            const { habitId, day, newStatus } = action.payload;

            // Find the habit by ID
            const habitToUpdate = state.habits.find((habit) => habit.id === habitId);
            // console.log(habitToUpdate);
            if (habitToUpdate) {
                // Update the status of the specified day
                habitToUpdate.days[day] = newStatus
            }
        },
        setNotification: (state, action) => {
            state.message = true; // Set message flag to true to display a notification
        }
    }
});

// Export the Habit reducer, actions, and selector
export const habitsReducer = habitsSlice.reducer
export const habitsActions = habitsSlice.actions
export const habitsSelector = (state) => state.habitsReducer
