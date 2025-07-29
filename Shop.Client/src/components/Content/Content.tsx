import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import ProductList from "../ProductList/ProductList";
import Product from "../Product/Product";
import { IProduct } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

const URL = "http://localhost:3000/api/products";

export interface ComponentProps {
  products: IProduct[];
	isLoaded?: boolean;
}

export default function Content() {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [isLoaded, setIsLoaded] = useState(false)

  async function getProducts() {
    try {
      const dataProduct = await axios.get(URL).then((res) => res.data);
      setProducts(dataProduct);
    } catch (error) {
      console.log(error);
    }
  }

	useEffect(() => {
	   setTimeout(() => {
       setIsLoaded(true);
     }, 3000);
    getProducts();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={"/"}
          element={<Home products={products} />}
        />
        <Route
          path={"/product-list"}
          element={
			  <ProductList products={products} isLoaded={isLoaded} />
          }
        />
        <Route path={"/:id"} element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}
