import React from "react";
import SearchItem from "./searchitem";

function Searchitems({ restinfo }) {
  return (
    <div
      style={{
        width: "auto",
        margin: "0.5rem", // m-2
        padding: "0.75rem", // p-3
      }}
    >
      <h1
        style={{
          width: "100%", // w-full
          borderBottom: "2px solid #16a34a", // border-b-2 border-green-600
          fontSize: "1.5rem", // text-2xl
          lineHeight: "2rem",
          color: "#000000", // text-black
        }}
      >
        {restinfo.rest.Restaurant_name}
      </h1>
      <div
        style={{
          width: "auto",
          display: "flex", // flex
          gap: "1rem", // gap-4
          padding: "0.5rem", // p-2
          backgroundColor: "#dcfce7", // bg-green-100
          border: "1px solid #e5e7eb", // border (default gray-200)
        }}
      >
        {restinfo.items?.map((item, index) => (
          <SearchItem
            key={index}
            iteminfo={item}
            rest={restinfo?.rest}
          ></SearchItem>
        ))}
      </div>
    </div>
  );
}

export default Searchitems;