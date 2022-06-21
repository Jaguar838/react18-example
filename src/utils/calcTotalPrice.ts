import {CartItemType} from "../redux/slices/cartSlice";

export const calcTotalPrice = (items: CartItemType[]) => {
    return items.reduce((sum, obj) => obj.count * obj.price + sum, 0);
};