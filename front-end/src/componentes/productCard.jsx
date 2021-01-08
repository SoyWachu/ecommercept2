import React, { useState, useEffect, useMemo } from "react";

export default function Product(props) {
  const [data, setData] = useState([]);
  const [sort, setSort] = useState({ by: "", order: "asc" });
  const [isFiltered, setIsFiltered] = useState(false);
  const [isFilteredBy, setIsFilteredBy] = useState("");

  useEffect(() => setData(props.producto), [props.producto]);

  const sorted = useMemo(() => {
    const arr = [...data];

    if (sort.by) {
      return arr?.sort((a, b) => {
        if (sort.order === "asc") {
          return a[sort.by] > b[sort.by] ? 1 : -1;
        }
        return a[sort.by] < b[sort.by] ? 1 : -1;
      });
    }
    return arr;
  }, [sort, data]);

  const sortAsc = (e) => {
    e.preventDefault();
    setSort({ by: "price", order: "asc" });
    setIsFiltered(false);
  };

  const sortDesc = (e) => {
    e.preventDefault();
    setSort({ by: "price", order: "desc" });
  };

  return (
    <div>
      {console.log(isFilteredBy)}

      <div className="grid grid-cols-4 ">
        {isFiltered === false
          ? sorted?.map((p, i) => (
              <div
                className="mx-4  m-4 flex justify-center flex-col hover:shadow-lg"
                key={i}
              >
                <img
                  className="h-56 object-contain border-b-2 "
                  alt="Imagen de Producto"
                  src={p.img}
                />
                <h1 className="text-lg font-bold mt-4 ml-4">{p.title}</h1>
                <div className="font-semibold mt-4 ml-4 mb-4">
                  <div>
                    Precio: {p.price} {p.currency_id}
                  </div>
                  <div>Condicion: {p.condition}</div>
                  <div>Stock: {p.available_quantity}</div>
                </div>
              </div>
            ))
          : sorted
              ?.filter((p) => {
                return p.condition === isFilteredBy;
              })
              ?.map((p, i) => {
                return (
                  <div
                    className="mx-4  m-4 flex justify-center flex-col hover:shadow-lg"
                    key={i}
                  >
                    <img
                      className="h-56 object-contain border-b-2 "
                      alt="Imagen de Producto"
                      src={p.img}
                    />
                    <h1 className="text-lg font-bold mt-4 ml-4">{p.title}</h1>
                    <div className="font-semibold mt-4 ml-4 mb-4">
                      <div>
                        Precio: {p.price} {p.currency_id}
                      </div>
                      <div>Condicion: {p.condition}</div>
                      <div>Stock: {p.available_quantity}</div>
                    </div>
                  </div>
                );
              })}
      </div>
      <h1 className="flex justify-center mb-4">Ordenar Por Precio</h1>
      <div className="flex justify-center">
        <select
          onChange={(e) => {
            setIsFiltered(true);
            setIsFilteredBy(e.target.value);
          }}
        >
          <option value="new">Nuevo</option>
          <option value="used">Usado</option>
        </select>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={sortAsc}
        >
          ^
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={sortDesc}
        >
          v
        </button>
      </div>
    </div>
  );
}
