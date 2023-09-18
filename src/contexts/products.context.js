import { createContext, useState } from "react";
import PRODUCTS from "../shop-data.json";

// store the context
export const ProductsContext = createContext({
  products: [],
});

// provide the context to the child components
// return a component.
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
