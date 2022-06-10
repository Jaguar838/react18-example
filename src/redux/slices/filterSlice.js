import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sortType: {
        name: "популярности",
        sortProperty: "rating",
    },
};

export const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSearchValue(state, action) {
            state.searchValue = action.payload;
        },
        setSortType(state, action) {
            state.sortType = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setFilters(state, action) {
            state.sortType = action.payload.sortType;
            state.categoryId = Number(action.payload.categoryId);
            state.currentPage = Number(action.payload.currentPage);
        },
    },
});
export const selectFilter = (state) => state.filter
// Action creators are generated for each case reducer function
export const {setSearchValue, setCategoryId, setSortType, setCurrentPage, setFilters} =
    filterSlice.actions;

export default filterSlice.reducer;
