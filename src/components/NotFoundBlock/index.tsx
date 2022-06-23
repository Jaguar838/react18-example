import React from "react";
import css from "./NotFoundBlock.module.scss";

export const NotFoundBlock: React.FC = () => {
    return (
        <div className={css.root}>
            <h1>
                <span>😕</span>
                <br/>
                Ничего не найдено
            </h1>
            <p className={css.description}>
                К сожалени данная страница отсутствует в нашем интернет-магазине
            </p>
        </div>
    );
}
