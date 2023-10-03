import { CategoriesContext } from "../../contexts/categories.context.js";
import ProductCard from "../../components/product-card/product-card.component.js";

import { useContext, Fragment } from "react";
import "./shop.styles.scss";

const Shop = () => {
  // gotta destruct products from context component
  const { categoriesMap } = useContext(CategoriesContext);
  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => (
        <Fragment key={title}>
          <h2>{title}</h2>
          <div className="products-container">
            {categoriesMap[title].map((product) => {
              const { id } = product;
              return <ProductCard key={id} product={product} />;
            })}
          </div>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default Shop;
