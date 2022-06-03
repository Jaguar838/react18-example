import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    categoryId: 0,
    sortType: {
        name: "популярности",
        sotrProperty: "rating",
    }
}

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload
            console.log('action setCategoryId', action)

        },
        setSortType(state, action) {
            state.sortType = action.payload
            console.log('action setSortType',action)
        },
    },
})

// Action creators are generated for each case reducer function
export const {setCategoryId, setSortType} = filterSlice.actions

export default filterSlice.reducer