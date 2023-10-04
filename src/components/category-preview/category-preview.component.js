import { Link } from "react-router-dom";
import ProductCard from "../product-card/product-card.component";
import "./category-preview.styles.scss";

const CategoryPreview = ({ title, products }) => {
  return (
    <div className="category-preview-container">
      <h2>
        <Link className="title" to={title}>
          {title.toUpperCase()}
        </Link>
        {/* <span className="title">{title.toUpperCase()}</span> */}
      </h2>
      <div className="preview">
        {/* we want to filter out anything but the first row, get a call back, this call back is gonna get product (_ is to ignore), use idx = array index, we want to filter out idx greater than 4, whatever evaluate to false get thrown away, after filter it out, we map through it and pass to product card component so it renders  */}
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
    // last thing is to import it to shop component so it renders preview page and then user can click on each title to get more displayed items
  );
};

export default CategoryPreview;
