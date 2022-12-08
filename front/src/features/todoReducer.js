import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    tasks: [],
    error: null,
    loading: true
}
export const fetchtasks = createAsyncThunk('tasks/fetch', async (_, thunkAPI) => {
    try {
        const res = await fetch('http://localhost:3110/tasks')
        const tasks = await res.json()

        if (tasks.error) {
            return thunkAPI.rejectWithValue(tasks.error)
        }
        return thunkAPI.fulfillWithValue(tasks)

    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }

})

export const completeTask = createAsyncThunk('tasks/complete', async (data, thunkAPI) => {
    try {
        const res = await fetch(`http://localhost:3110/task/${data.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ completed: !data.completed }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const tasks = await res.json()
        if (tasks.error) {
            return thunkAPI.rejectWithValue(tasks.error)
        }
        return thunkAPI.fulfillWithValue(tasks)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }

})

export const deleteTask = createAsyncThunk('tasks/delete', async (data, thunkAPI) => {
    try {
        const res = await fetch(`http://localhost:3110/task/${data.id}`, {
            method: 'DELETE',
        })
        const tasks = await res.json()
        if (tasks.error) {
            return thunkAPI.rejectWithValue(tasks.error)
        }
        return thunkAPI.fulfillWithValue(tasks)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const addTask = createAsyncThunk('tasks/add', async (data, thunkAPI) => {
    try {
        const res = await fetch('http://localhost:3110/task', {
            method: 'POST',
            body: JSON.stringify({title: data.title}),
            headers: {
                'Content-type' : 'application/json'
            }
        })
        const tasks = await res.json()
        if (tasks.error) {
            return thunkAPI.rejectWithValue(tasks.error)
        }
        return thunkAPI.fulfillWithValue(tasks)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})
const todoSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchtasks.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchtasks.fulfilled, (state, action) => {
                state.loading = false

                state.tasks = action.payload
            })
            .addCase(fetchtasks.rejected, (state, action) => {
                state.loading = false

                state.error = action.payload
            })
            .addCase(completeTask.pending, (state, action) => {
                state.error = null
                state.tasks = state.tasks.map((task) => {
                    if(task._id === action.meta.arg.id) {
                        task.loading = true
                    }
                    return task
                })
            })
            .addCase(completeTask.fulfilled, (state, action) => {
                state.error=null
                state.loading = false
                state.tasks = state.tasks.map((task) => {
                    if (task._id === action.payload._id) {
                        task.completed = !task.completed
                        task.loading = false
                    }
                    return task
                })
            })
            .addCase(completeTask.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.error=null

                state.loading = false
                state.tasks = state.tasks.filter((task) => {
                    if (task._id === action.payload._id) {
                        return false
                    }
                    return true
                })
            })
            .addCase(deleteTask.pending, (state, action) => {
                state.tasks = state.tasks.map((task) => {
                    if(task._id === action.meta.arg.id) {
                        task.loading = true
                    }
                    return task
                })
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.loading = false

                state.error = action.payload
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.loading = false
                state.tasks.push(action.payload)
            })
            .addCase(addTask.rejected, (state, action) => {
                state.loading = false

                state.error = action.payload
            })
            .addCase(addTask.pending, (state) => {
                state.error = null
            })
    }
})

export default todoSlice.reducer