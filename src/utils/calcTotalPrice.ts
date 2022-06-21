import {CartItemType} from "../redux/cart/types";

export const calcTotalPrice = (items: CartItemType[]) => {
    return items.reduce((sum, obj) => obj.count * obj.price + sum, 0);
};