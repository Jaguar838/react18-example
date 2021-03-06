import React, {useState, useEffect, useContext} from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import {SearchContext} from "../App";

export default function Home() {const {searchValue}=useContext(SearchContext)
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sotrProperty: "rating",
  });

  const sortBy = sortType.sotrProperty.replace("-", "");
  const order = sortType.sotrProperty.includes("-") ? "asc" : "desc"; // ↑ : ↓
  const category = categoryId > 0 ? `category=${categoryId}` : "";
  const search = searchValue ? `&search=${searchValue}` : "";

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://626d16545267c14d5677d9c2.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => {
        return res.json();
      })
      .then((pizzas) => {
        // setTimeout(() => {
        setItems(pizzas);
        setIsLoading(false);
        // }, 1000);
        window.scrollTo(0, 0);
      });
  }, [category, sortBy, order, search, currentPage]);
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzas = items
    //search array pizzas
    // .filter((obj) => {
    //   if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
    //     return true;
    //   }
    //   return false;
    // })
    .map(({ id, title, price, imageUrl, sizes, types }) => (
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
          onClickCategory={(i) => setCategoryId(i)} // onClick component Category => i
        />
        <Sort
          activeSortType={sortType}
          onChangeSort={(obj) => setSortType(obj)} // onClickSortList component Sort => obj
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
}
