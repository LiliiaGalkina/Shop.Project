import { Link } from "react-router-dom";
import style from "./home.module.scss";
import { ComponentProps } from "../Content/Content";
import { FunctionComponent } from "react";



const Home: FunctionComponent<ComponentProps> = ({ products }) => {
	const count = products.length;
	const sumPrice = products.reduce((sum, item) => sum + +item.price, 0)
  return (
    <main className={style.main}>
      <div className={style.items}>
        <h1 className={style.title}>Shop.Client</h1>
        <p className={style.text}>
          В базе данных находится <span>{count}</span> товаров общей стоимостью <span>{sumPrice}</span> рублей.
        </p>
        <div className={style.buttons}>
          <Link to="/product-list" className={style.button}>
            Перейти к списку товаров
          </Link>
          <Link to="/admin" className={style.button} target="_blank">
            Перейти в систему администрирования
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;


