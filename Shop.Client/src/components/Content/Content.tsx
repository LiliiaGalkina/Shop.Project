import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import ProductList from "../ProductList/ProductList";
import Product from "../Product/Product";

export default function Content() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/product-list"} element={<ProductList />} />
        <Route path={"/:id"} element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}
