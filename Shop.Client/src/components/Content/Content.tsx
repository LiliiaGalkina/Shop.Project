import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import ProductList from "../ProductList/ProductList";
import Product from "../Product/Product";
import { IProduct } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

export const URL = "http://localhost:3000/api/products";

export interface ComponentProps {
  products: IProduct[];
  isLoader?: boolean;
  isError?: boolean;
}

export default function Content() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);

  async function getProducts() {
    try {
      setIsLoader(true);
      const dataProduct = await axios.get(URL).then((res) => res.data);
      setProducts(dataProduct);
      setIsLoader(false);
	} catch (error) {
		setIsError(true);
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home products={products} />} />
        <Route
          path={"/product-list"}
          element={<ProductList products={products} isLoader={isLoader} isError={isError} />}
        />
        <Route path={"/:id"} element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}
