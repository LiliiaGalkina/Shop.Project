import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import ProductList from "../ProductList/ProductList";
import Product from "../Product/Product";
import {  IProduct } from "@/types";
import axios from "axios";
import {useEffect, useState } from "react";

const URL = "http://localhost:3000/api/products";



export interface ComponentProps {
  products: IProduct[];
  setProducts: (value: any) => void;
}

export default function Content() {
  const [products, setProducts] = useState<IProduct[]>([]);

  async function getProducts() {
    const dataProduct = await axios
      .get(URL)
		  .then((res) => res.data);
    setProducts(dataProduct);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={"/"}
          element={<Home products={products} setProducts={setProducts} />}
        />
        <Route
          path={"/product-list"}
          element={
            <ProductList products={products} setProducts={setProducts} />
          }
        />
        <Route path={"/:id"} element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}
