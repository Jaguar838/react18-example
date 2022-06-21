import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IFilterSliceState, Sort, SortPropertyEnum} from "./types";


const initialState: IFilterSliceState = {
    searchValue: "",
    categoryId: 0,
    currentPage: 1,
    sortOption: {
        name: "популярности",
        sortProperty: SortPropertyEnum.RATING_DESC,
    },
};

export const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setSortOption(state, action: PayloadAction<Sort>) {
            state.sortOption = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setFilters(state, action: PayloadAction<IFilterSliceState>) {
            if (Object.keys(action.payload).length) {
                state.sortOption = action.payload.sortOption;
                state.categoryId = Number(action.payload.categoryId);
                state.currentPage = Number(action.payload.currentPage);
            } else {
                state.currentPage = 1;
                state.categoryId = 0;
                state.sortOption = {
                    name: "популярности",
                    sortProperty: SortPropertyEnum.RATING_DESC,
                };
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setSearchValue,
    setCategoryId,
    setSortOption,
    setCurrentPage,
    setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;