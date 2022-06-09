import React, {useState, useEffect, useContext, useRef} from "react";
import qs from "qs";
import {SearchContext} from "../App";
import {useSelector, useDispatch} from "react-redux";
import {
    setCategoryId,
    setSortType,
    setCurrentPage,
    setFilters,
} from "../redux/slices/filterSlice";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {sortList} from "../components/Sort";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";

export default function Home() {
    const {categoryId, currentPage, sortType} = useSelector(
        (state) => state.filter
    );
    console.log(categoryId, currentPage, sortType);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isSearch = useRef(true);
    const isMounted = useRef(false); // Первого рендера еще не было

    const {searchValue} = useContext(SearchContext);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    };
    const onChangeSortType = (obj) => {
        dispatch(setSortType(obj));
    };
    const onChangePages = (number) => {
        dispatch(setCurrentPage(number));
    };
    const sortBy = sortType.sortProperty.replace("-", "");
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc"; // ↑ : ↓
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    const fetchPizzas = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`https://626d16545267c14d5677d9c2.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
            setItems(res.data);
        } catch (error) {
            console.debug('Error message:', error.message)
        } finally {
            setIsLoading(false)
        }
        window.scrollTo(0, 0);

    }

    // Если изменили параметры и был 1-й рендер
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                categoryId,
                sortProperty: sortType.sortProperty,
                currentPage,
            });
            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [category, sortBy, order, search, currentPage]);

    // Если был первый рендер, то сохраняем параметры-Url в редаксе
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            console.log(params);
            const sortType = sortList.find(
                (obj) => obj.sortProperty === params.sortProperty
            );

            dispatch(setFilters({...params, sortType}));
            isSearch.current = false;
        }
    }, []);

    // Если был первый рендер, то запрашиваем пиццы
    useEffect(() => {
            if (isSearch.current) {
                fetchPizzas();
//   axios
                //     .get(
                //       `https://626d16545267c14d5677d9c2.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
                //     )
                //     .then((res) => {
                //       setItems(res.data);
                //       setIsLoading(false);
                //     })
                //       .catch((err)=> {
                //         setIsLoading(false)
                //         console.debug('Error message:',err.message)});
            }
            isSearch.current = true;

        }
        ,
        [category, sortBy, order, search, currentPage]
    );

    const skeletons = [...new Array(6)].map((_, index) => (
        <Skeleton key={index}/>
    ));
    const pizzas = items.map(({id, title, price, imageUrl, sizes, types}) => (
        <PizzaBlock
            key={id}
            id={id}
            title={title}
            price={price}
            imageUrl={imageUrl}
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
