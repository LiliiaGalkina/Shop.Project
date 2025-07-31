import { FunctionComponent, useState } from "react";
import { ComponentProps } from "../Content/Content";
import style from "./productlist.module.scss";
import placheholder from "../product-placeholder.png";
import { Link } from "react-router-dom";

const ProductList: FunctionComponent<ComponentProps> = ({ products, isLoader, isError}) => {
  const [name, setName] = useState("");
  const [minPrice, setMinPrice] = useState("");
	const [maxPrice, setMaxPrice] = useState("");
	const [productList, setProductList] = useState(products);
	
	
	let productItems = productList;	
	
	const makeFiltered = () =>{
		if (name) {
			if (minPrice && maxPrice) {
				productItems = products.filter(
          (item) =>
            item.title.toLowerCase().includes(name.toLowerCase()) &&
            item.price > +minPrice &&
            item.price < +maxPrice
        );
			} else if (minPrice && !maxPrice) {
				productItems = products.filter(
          (item) =>
            item.title.toLowerCase().includes(name.toLowerCase()) &&
            item.price > +minPrice
        ); 
			} else if (!minPrice && maxPrice) {
				productItems = products.filter(
          (item) =>
            item.title.toLowerCase().includes(name.toLowerCase()) &&
            item.price < +maxPrice
        ); 
			} else if (!minPrice && !maxPrice) {
				productItems = products.filter(
          		(item) => item.title.toLowerCase().includes(name.toLowerCase()))
			}
		} else {
			if (minPrice && maxPrice) {
				productItems = products.filter(
          (item) =>
            item.price > +minPrice &&
            item.price < +maxPrice)
			} else if (minPrice && !maxPrice) {
				productItems = products.filter(
          (item) => item.price > +minPrice )
			} else if (!minPrice && maxPrice) {
				productItems = products.filter(
          (item) => item.price < +maxPrice
        )
			} else {
				productItems = products;
			}
		}
		setProductList(productItems);
	}

	const clearFilter = () => {
		setName("");
		setMinPrice("");
		setMaxPrice("");
		setProductList(products)
	
	}

	const productsCard = productList.map((item) => (
    <Link key={item.id} className={style.item} to={`/${item.id}`}>
      <div className={style.image}>
        <img
          src={item.thumbnail ? item.thumbnail.url : placheholder}
          alt="фото товара"
        />
      </div>
      <h3 className={style.itemtitle}>
        {item.title}
      </h3>
      <p className={style.price}>
        <span>{item.price}</span> руб.
      </p>
      <p className={style.commentscount}>
        Всего комментариев:
        <span>{item.comments ? item.comments.length : 0}</span>
      </p>
    </Link>
  ));

  return (
    <main className={style.main}>
      <div className="container">
        <section className={style.filterblock}>
          <h2 className={style.title}>Фильтр</h2>
          <div className={style.filters}>
            <div className={style.filter}>
              <p className={style.filtertitile}>Название товара</p>
              <input
                type="text"
                placeholder="Название"
                className={style.filterinput}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={style.filter}>
              <p className={style.filtertitile}>Цена</p>
              <div className={style.doubleinputs}>
                <p className={style.doublefiltertext}>от</p>
                <input
                  type="text"
                  placeholder="Цена от"
                  className={style.filterinput}
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <p className={style.doublefiltertext}>до</p>
                <input
                  type="text"
                  placeholder="Цена до"
                  className={style.filterinput}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className={style.buttons}>
            <button className={style.button} onClick={makeFiltered}>
              Применить
            </button>
            <button className={style.button} onClick={clearFilter}>
              Сброс фильтра
            </button>
          </div>
        </section>
			  <div className={style.loader}>{isLoader && "Загрузка данных..."}</div>
			  <div className={style.error}>{isError && "Ошибка загрузки данных. Вернитесь на главную страницу."} </div>
        {!isLoader && !isError && (
          <section>
            <h2 className={style.title}>
              Список товаров (<span>{productList.length}</span>)
            </h2>
            <div className={style.noproduct}>
              {productsCard.length === 0 &&
                "По вашему запросу ничего не найдено."}
            </div>
            <div className={style.items}>{productsCard}</div>
          </section>
        )}
      </div>
    </main>
  );
};

export default ProductList;
