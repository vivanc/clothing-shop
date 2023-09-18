import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context.js";
import { CartContext } from "../../contexts/cart.context.js";
import { signOutUser } from "../../utils/firebase/firebase.utils.js";
import CartIcon from "../../components/cart-icon/cart-icon.component.js";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component.js";

import "./navigation.styles.scss";

const Navigation = () => {
  //step 1 (context)
  const { currentUser } = useContext(UserContext);
  // console.log(currentUser);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="link-container" to="/shop">
            SHOP
          </Link>
          {/* if there is currentUser (which is set in the context, then show SIGN OUT, otherwise, show SIGN IN) */}
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="link-container" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}{" "}
        {/* if true, returns the last thing: <CartDropdown /> */}
      </div>

      <Outlet />
    </Fragment>
  );
};

export default Navigation;
