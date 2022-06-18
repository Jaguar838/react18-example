import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum SortPropertyEnum {
  TITLE_DESC = "title",
  TITLE_ASC = "-title",
  PRICE_DESC = "price",
  PRICE_ASC = "-price",
  RATING_DESC = "rating",
  RATING_ASC = "-rating",
}
export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export interface IFilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sortOption: Sort;
}
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
export const selectFilter = (state: RootState) => state.filter;
// Action creators are generated for each case reducer function
export const {
  setSearchValue,
  setCategoryId,
  setSortOption,
  setCurrentPage,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
