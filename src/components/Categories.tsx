import React, { memo } from "react";

type CategoriesProps = {
  activeCategory: number;
  onClickCategory: (indxCategory: number) => void;
};
const categories: string[] = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories: React.FC<CategoriesProps> = memo(
  ({ activeCategory, onClickCategory }) => {
    // console.log(activeCategory);

    return (
      <div className="categories">
        <ul>
          {categories.map((categoryName, i) => (
            <li
              key={i}
              onClick={() => onClickCategory(i)}
              className={activeCategory === i ? "active" : ""}
            >
              {categoryName}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
export default Categories;
