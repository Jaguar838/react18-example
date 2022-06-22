import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

interface IPizza {
  title: string;
  imageUrl: string;
  price: number;
}

export default function FullPizza() {
  const [pizza, setPizza] = useState<IPizza>({
    title: "",
    imageUrl: "",
    price: 0,
  });
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://626d16545267c14d5677d9c2.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Ошибка при получении пиццы!");
        navigate("/");
      }
    }

    fetchPizza();
  }, []);

  //   if (!pizza) {
  //     return <>Loading...</>;
  //   }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="Pizza" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₴</h4>
      <Link to="/not">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
}
