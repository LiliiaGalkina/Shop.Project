import { Link } from "react-router-dom";
import style from "./home.module.scss";
import { ComponentProps } from "../Content/Content";


const Home: React.FC<ComponentProps> = ({infoProducts}) => {

  return (
    <main className={style.main}>
      <div className={style.items}>
        <h1 className={style.title}>Shop.Client</h1>
        <p className={style.text}>
				  В базе данных находится <span>{infoProducts.count}</span> товаров общей стоимостью <span>{infoProducts.sum}</span> рублей.
        </p>
        <div className={style.buttons}>
          <Link to="/products-list" className={style.button}>
            Перейти к списку товаров
          </Link>
          <Link to="/admin" className={style.button} target="_blank">
            Перейти в систему администрирования
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Home;

