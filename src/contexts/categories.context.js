import { createContext, useState, useEffect } from "react";

import {
  addCollectionAndDocuments,
  getCategoriesAndDocuments,
} from "../utils/firebase/firebase.utils";

import SHOP_DATA from "../shop-data.js";

// store the context
export const CategoriesContext = createContext({
  categoriesMap: {},
});

// provide the context to the child components
// return a component.
export const CategoriesProvider = ({ children }) => {
  // we are making it object instead of array because we are interfacing object's key in order to get it to render
  const [categoriesMap, setCategoriesMap] = useState({});

  // delete after its done once. typically not do it in front end. just to demonstrate. it is mounted.
  // useEffect(() => {
  //   addCollectionAndDocuments("categories", SHOP_DATA);
  // }, []);

  // get queried doc to render
  // define a new async to call it if you are calling async function inside useEffect.
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      console.log(categoryMap);
      setCategoriesMap(categoryMap);
    };
    // after define it, invoke it.
    getCategoriesMap();
  }, []);

  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
