import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    items: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        addItem(state, action) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id)
            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }
            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.count * obj.price) + sum
            }, 0)
        },

        minusItem(state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload)
            if (findItem) {
                findItem.count--
            }
        },

        removeItem(state, action) {
            state.items = state.items.filter(obj => obj.id !== action.payload);
        },

        clearItem(state) {
            state.items = []
            state.totalPrice = 0
        },
    },
});
export const selectorCart = (state) => state.cart
export const selectorCartItemById = (id) => state => state.cart.items.find(obj => obj.id === id)
// Action creators are generated for each case reducer function
export const {addItem, removeItem, clearItem, minusItem} =
    cartSlice.actions;

export default cartSlice.reducer;
