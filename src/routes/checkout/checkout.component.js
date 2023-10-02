import "./checkout.styles.scss";
import { CartContext } from "../../contexts/cart.context";
import { useContext } from "react";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const Checkout = () => {
  const { cartItems, addItemToCart, removeItemFromCart, cartTotal } =
    useContext(CartContext);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>

      {cartItems.map((cartItem) => {
        // const { id, name, quantity } = cartItem;
        return (
          <CheckoutItem key={cartItem.id} cartItem={cartItem} />
          // <div key={id}>
          //   <h2>{name}</h2>
          //   <span>{quantity}</span>
          //   <br />
          //   <span onClick={() => removeItemFromCart(cartItem)}>decrement</span>
          //   <br />
          //   <span onClick={() => addItemToCart(cartItem)}>increment</span>
          // </div>
        );
      })}
      <span className="total">Total: ${cartTotal}</span>
    </div>
  );
};
export default Checkout;
