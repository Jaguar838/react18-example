import React, { useCallback, useEffect, useRef } from "react";
import qs from "qs";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
  selectFilter,
} from "../redux/slices/filterSlice";
import {
  fetchPizzas,
  SearchPizzaParams,
  selectPizzaData,
} from "../redux/slices/pizzasSlice";
import { useNavigate } from "react-router-dom";
import { sortList } from "../components/Sort";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import css from "../components/NotFoundBlock/NotFoundBlock.module.scss";

const Home: React.FC = () => {
  const { categoryId, currentPage, sortOption, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isSearch = useRef(true);
  const isMounted = useRef(false); // Первого рендера еще не было

  const onChangeCategory = useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const onChangePages = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const sortBy = sortOption.sortProperty.replace("-", "");
  const order = sortOption.sortProperty.includes("-") ? "asc" : "desc"; // ↑ : ↓
  const category = categoryId > 0 ? `category=${categoryId}` : "";
  const search = searchValue ? `&search=${searchValue}` : "";

  const getPizzas = async () => {
    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      })
    );

    window.scrollTo(0, 0);
  };

  // Если изменили параметры и был 1-й рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        sortProperty: sortOption.sortProperty,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [category, sortBy, order, search, currentPage]);

  // Если был первый рендер, то сохраняем параметры-Url в редаксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as SearchPizzaParams;
      console.log(params);
      const sortOption = sortList.find(
        (obj) => obj.sortProperty === params.sortBy
      );

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sortOption: sortOption || sortList[0],
        })
      );
      isSearch.current = false;
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    if (isSearch.current) {
      getPizzas();
    }
    isSearch.current = true;
  }, [category, sortBy, order, search, currentPage]);

  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzas = items.map(
    ({ id, title, price, imageUrl, sizes, types, rating }) => (
      <PizzaBlock
        key={id}
        id={id}
        title={title}
        price={price}
        imageUrl={imageUrl}
        sizes={sizes}
        types={types}
        rating={rating}
      />
    )
  );
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={categoryId}
          onClickCategory={onChangeCategory} // onClick component Category => i
        />
        <Sort activeSortOption={sortOption} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className={css.root}>
          <h1>
            <span>😕</span>
            <br />
            Ошибка соединения
          </h1>
          <p className={css.description}>
            К сожалени не удалось получить пиццы! Попробуйте повторить попытку
            позже
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePages} />
    </div>
  );
};
export default Home;
