import React, {useState, useEffect, useContext} from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import {SearchContext} from "../App";
import {useSelector, useDispatch} from 'react-redux'
import {setCategoryId, setSortType, setCurrentPage} from '../redux/slices/filterSlice'
import axios from "axios";

export default function Home() {
    const {categoryId, currentPage, sortType} = useSelector((state) => state.filter)
    console.log('sortType', sortType)
    const dispatch = useDispatch()
    const {searchValue} = useContext(SearchContext)
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const onChangeCategory = (id) => {
        console.log('onChangeCategory', id)
        dispatch(setCategoryId(id))
    }
    const onChangeSortType = (obj) => {
        console.log('onChangeSortType', obj)
        dispatch(setSortType(obj))
    }
    const onChangePages = (number) => {
        dispatch(setCurrentPage(number))
    }
    const sortBy = sortType.sotrProperty.replace("-", "");
    const order = sortType.sotrProperty.includes("-") ? "asc" : "desc"; // ↑ : ↓
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    useEffect(() => {
            setIsLoading(true);
            // fetch(
            //   `https://626d16545267c14d5677d9c2.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
            // )
            //   .then((res) => {
            //     return res.json();
            //   })
            //   .then((pizzas) => {
            //     setItems(pizzas);
            //     setIsLoading(false);
            //
            //   });
            axios.get(`https://626d16545267c14d5677d9c2.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
                .then((res) => {
                    setItems(res.data);
                    setIsLoading(false);
                })
            window.scrollTo(0, 0)
        },

        [category, sortBy, order, search, currentPage]
    )
    ;

    const skeletons = [...new Array(6)].map((_, index) => (
        <Skeleton key={index}/>
    ));
    const pizzas = items
        .map(({id, title, price, imageUrl, sizes, types}) => (
            <PizzaBlock
                key={id}
                title={title}
                price={price}
                image={imageUrl}
                sizes={sizes}
                types={types}
            />
        ));
    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    activeCategory={categoryId}
                    onClickCategory={onChangeCategory} // onClick component Category => i
                />
                <Sort
                    activeSortType={sortType}
                    onChangeSort={onChangeSortType} // onClickSortList component Sort => obj
                />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">{isLoading ? skeletons : pizzas}</div>
            <Pagination currentPage={currentPage} onChangePage={onChangePages}/>
        </div>
    );
}
