import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import ProductList from "../ProductList/ProductList";
import Product from "../Product/Product";
import { InfoProducts, IProduct } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

const URL = "http://localhost:3000/api/products";

let info: InfoProducts = {
  count: 0,
  sum: 0,
  items: [],
};
export interface ComponentProps {
  infoProducts: InfoProducts;
}

export default function Content() {
  const [infoProducts, setInfoProducts] = useState(info);

  async function getProducts() {
    const dataProduct: IProduct[] = await axios
      .get<IProduct[]>(URL)
      .then((res) => res.data);
    const productsCount = dataProduct.length;
    const producSum = dataProduct.reduce((sum, item) => sum + +item.price, 0);
    info = {
      count: productsCount,
      sum: producSum,
      items: dataProduct,
    };
    setInfoProducts(info);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <BrowserRouter>
      {" "}
      <Routes>
        <Route path={"/"} element={<Home infoProducts={infoProducts} />} />{" "}
        <Route
          path={"/product-list"}
          element={<ProductList infoProducts={infoProducts} />}
        />{" "}
        <Route path={"/:id"} element={<Product />} />
      </Routes>{" "}
    </BrowserRouter>
  );
}
