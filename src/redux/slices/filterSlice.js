import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    categoryId: 0,
    currentPage: 1,
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
            console.log('action setSortType', action)
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
            console.log('action setCurrentPage', action)
        },
    },
})

// Action creators are generated for each case reducer function
export const {setCategoryId, setSortType, setCurrentPage} = filterSlice.actions

export default filterSlice.reducer