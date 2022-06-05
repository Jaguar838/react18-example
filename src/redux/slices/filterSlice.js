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
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },
        setFilters(state, action) {
            state.categoryId = action.payload.categoryId
            state.sortType = Number(action.payload.sortType)
            state.currentPage = Number(action.payload.currentPage)
        }
    },
})

// Action creators are generated for each case reducer function
export const {setCategoryId, setSortType, setCurrentPage, setFilters} = filterSlice.actions

export default filterSlice.reducer