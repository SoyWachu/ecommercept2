import React, { useState, useEffect, useMemo } from "react";

export default function Product(props) {
  const [data, setData] = useState([]);
  const [sort, setSort] = useState({ by: "", order: "asc" });

  useEffect(() => setData(props.producto), [props.producto]);

  const sorted = useMemo(() => {
    const arr = [].concat(data);
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

  const sorting = (e) => {
    e.preventDefault();
    setSort({ by: "price", order: "asc" });
  };

  return (
    <div>
      <h2>
        {sorted?.map((p, i) => (
          <div key={i}>
            <h1>{p.title}</h1>
            <img alt="Imagen de Producto" src={p.img} />
            <div>{p.price}</div>
            <div>{p.currency_id}</div>
            <div>{p.condition}</div>
            <div>{p.available_quantity}</div>
          </div>
        ))}
      </h2>
      {console.log(data)}

      <button onClick={sorting}>Precio</button>
    </div>
  );
}
