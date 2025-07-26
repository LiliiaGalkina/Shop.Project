import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import ProductList from "../ProductList/ProductList";
import Product from "../Product/Product";
import { InfoProducts, IProduct } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

const URL = "http://localhost:3000/api/products";
let info = {
  count: 0,
  sum: 0,
};

export interface ComponentProps {
  infoProducts: InfoProducts;
}

export interface ItemsProps {
	productItems: IProduct[];
}

export default function Content() {
	const [infoProducts, setInfoProducts] = useState(info);
	const [productItems, setProductItems] = useState<IProduct[]>([]);

  async function getProducts() {
    const dataProduct: IProduct[] = await axios
      .get<IProduct[]>(URL)
      .then((res) => res.data);
    const productsCount = dataProduct.length;
    const producSum = dataProduct.reduce((sum, item) => sum + +item.price, 0);
    info = {
      count: productsCount,
      sum: producSum,
	  };
	setProductItems(dataProduct)
    setInfoProducts(info);
  }

  useEffect(() => {
    getProducts();
  }, [info]);	
	
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home infoProducts = {infoProducts} />} />
        <Route path={"/product-list"} element={<ProductList productItems={productItems} />} />
        <Route path={"/:id"} element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}
