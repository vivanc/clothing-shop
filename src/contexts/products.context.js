import { createContext, useState, useEffect } from "react";

import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils";

import SHOP_DATA from "../shop-data.js";

// store the context
export const ProductsContext = createContext({
  products: [],
});

// provide the context to the child components
// return a component.
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // delete after its done once. typically not do it in front end. just to demonstrate. it is mounted.
  // useEffect(() => {
  //   addCollectionAndDocuments("categories", SHOP_DATA);
  // }, []);

  const value = { products };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
