import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPizzasSliceState, Pizza, Status} from "./types";
import {fetchPizzas} from "./asyncAction";


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

// Action creators are generated for each case reducer function
export const {setItems} = pizzasSlice.actions;

export default pizzasSlice.reducer;
