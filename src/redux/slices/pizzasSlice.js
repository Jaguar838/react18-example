import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzaStatus',
    async (param) => {
        const {
            sortBy,
            order,
            category,
            search,
            currentPage,
        } = param
        const {data} = await axios.get(`https://626d16545267c14d5677d9c2.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)

        return data
    }
)
const initialState = {
    items: [],
    status: 'loading', //loading|success|error
}

export const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        },

    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading'
            state.items = []
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload
            state.status = 'success'
        },
        [fetchPizzas.rejected]: (state) => {
            state.status = 'error'
            state.items = []

        }
    },
})

// Action creators are generated for each case reducer function
export const {setItems} = pizzasSlice.actions

export default pizzasSlice.reducer