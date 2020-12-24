import axios from "axios";
import React, { useState } from "react";
import ProductCard from "./productCard";
import Pagination from "./Pagination.jsx";
import Catalogo from "./Catalogo";

export default function SearchBar() {
  const [input, setInput] = useState({ producto: "" });
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);

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
      <form>
        <label>Ingresa tu Busqueda</label>
        <input
          type="text"
          name="q"
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          Buscar
        </button>
        <ProductCard producto={currentProduct || []} />
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={product?.data?.length}
          paginate={paginate}
        />
      </form>
    </div>
  );
}
