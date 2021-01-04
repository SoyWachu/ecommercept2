import axios from "axios";
import React, { useState } from "react";
import ProductCard from "./productCard";
import Pagination from "./Pagination.jsx";

export default function SearchBar() {
  const [input, setInput] = useState({ producto: "" });
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(30);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const products = await axios.get(
        `http://localhost:3000/api/search?producto=${input}`
      );
      setProduct(products);
    } catch (error) {
      console.error(error);
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProduct = product?.data?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="flex justify-center mt-16">
        <form>
          <input
            className="border-2 border-gray-300 bg-white h-10 pl-2 pr-16 rounded-lg text-sm focus:outline-none "
            type="text"
            name="q"
            placeholder="Ingresa tu Busqueda"
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" onClick={handleSubmit}></button>
        </form>
      </div>
      <ProductCard producto={currentProduct || []} />
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={product?.data?.length}
        paginate={paginate}
      />
    </div>
  );
}
