import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};
export type SearchPizzaParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: string;
};
export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  "pizzas/fetchPizzaStatus",
  async (param) => {
    const { sortBy, order, category, search, currentPage } = param;
    const { data } = await axios.get<Pizza[]>(
      `https://626d16545267c14d5677d9c2.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
  }
);
export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface IPizzasSliceState {
  items: Pizza[];
  status: "loading" | "success" | "error";
}

const initialState: IPizzasSliceState = {
  items: [],
  status: Status.LOADING, //loading|success|error
};

export const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});
export const selectPizzaData = (state: RootState) => state.pizzas;
// Action creators are generated for each case reducer function
export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
