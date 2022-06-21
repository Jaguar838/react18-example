import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {getCartFromLS} from "../../utils/getCartFromLocalStorage";
import {calcTotalPrice} from "../../utils/calcTotalPrice";

export type CartItemType = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    size: number;
    count?: number;
};

interface ICartSliceState {
    totalPrice: number;
    items: CartItemType[];
}

const {items, totalPrice} = getCartFromLS()

const initialState: ICartSliceState = {
    totalPrice,
    items,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItemType>) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id);
            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }
            state.totalPrice = calcTotalPrice(state.items)
        },

        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find((obj) => obj.id === action.payload);
            if (findItem) {
                findItem.count--;
            }
        },

        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter((obj) => obj.id !== action.payload);
        },

        clearItem(state) {
            state.items = [];
            state.totalPrice = 0;
        },
    },
});
export const selectorCart = (state: RootState) => state.cart;
export const selectorCartItemById = (id: string) => (state: RootState) =>
    state.cart.items.find((obj) => obj.id === id);

// Action creators are generated for each case reducer function
export const {addItem, removeItem, clearItem, minusItem} = cartSlice.actions;

export default cartSlice.reducer;
