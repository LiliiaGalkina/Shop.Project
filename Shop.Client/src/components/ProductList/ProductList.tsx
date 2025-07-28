import { FunctionComponent } from "react";
import { ComponentProps } from "../Content/Content";
import style from "./productlist.module.scss";
import placheholder from "../product-placeholder.png";

const ProductList: FunctionComponent<ComponentProps> = ({ infoProducts }) => {
 
  const products = infoProducts.items.map((item) => (
    <div key={item.id} className={style.item}>
      <div className={style.image}>
        <img src={placheholder} alt="фото товара" />
      </div>
      <h3 className={style.itemtitle}>{item.title}</h3>
      <p className={style.price}>
        <span>{item.price}</span> руб.
      </p>
      <p className={style.commentscount}>
        Всего комментариев:{" "}
        <span>{item.comments ? item.comments.length : 0}</span>
      </p>
    </div>
  ));

  return (
    <main className={style.main}>
      <div className="container">
        <h2 className={style.title}>
          Список товаров (<span>{infoProducts.items.length}</span>)
        </h2>
        <div className={style.items}>{products}</div>
      </div>
    </main>
  );
};

export default ProductList;
