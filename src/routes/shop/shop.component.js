import { ProductsContext } from "../../contexts/products.context.js";
import ProductCard from "../../components/product-card/product-card.component.js";

import { useContext } from "react";
import "./shop.styles.scss";

const Shop = () => {
  // gotta destruct products from context component
  const { products } = useContext(ProductsContext);
  return (
    <div className="products-container">
      {products.map((product) => {
        const { id } = product;
        return <ProductCard key={id} product={product} />;
      })}
    </div>
  );
};

export default Shop;
