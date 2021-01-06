import React, { useState } from "react";

export default function SearchBar(props) {
  const [input, setInput] = useState({ producto: "" });

  const onSubmit = (e) => {
    e.preventDefault();
    props.onSearch(input);
  };

  return (
    <div>
      <form className="flex justify-center mt-16" onSubmit={onSubmit}>
        <input
          className="border-2 border-gray-300 bg-white h-10 pl-2 pr-16 rounded-lg text-sm focus:outline-none "
          type="text"
          name="q"
          placeholder="Ingresa tu Busqueda"
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </div>
  );
}
