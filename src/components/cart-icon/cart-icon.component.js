import { useContext } from "react";
// import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import {
  CartIconCcontainer,
  ShoppingIcon,
  ItemCount,
} from "./cart-icon.styles.js";
import { CartContext } from "../../contexts/cart.context.js";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
  return (
    <CartIconCcontainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconCcontainer>
  );
};

export default CartIcon;
