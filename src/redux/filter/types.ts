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