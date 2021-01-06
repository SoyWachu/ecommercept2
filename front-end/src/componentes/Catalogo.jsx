import React, { useState } from "react";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import ProductCard from "./productCard";
import axios from "axios";

export default function Catalogo() {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [productsPerPage] = useState(30);

  const fetchData = async (input) => {
    const response = await axios.get(
      `http://localhost:3000/api/search?producto=${input}`
    );
    setProducts(response);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProduct = products?.data?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <SearchBar onSearch={fetchData} />
      <ProductCard producto={currentProduct || []} />
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={products?.data?.length}
        paginate={paginate}
      />
    </div>
  );
}
