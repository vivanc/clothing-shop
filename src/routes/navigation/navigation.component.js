import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context.js";
import { CartContext } from "../../contexts/cart.context.js";
import { signOutUser } from "../../utils/firebase/firebase.utils.js";
import CartIcon from "../../components/cart-icon/cart-icon.component.js";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component.js";

import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles.js";

const Navigation = () => {
  //step 1 (context)
  const { currentUser } = useContext(UserContext);
  // console.log(currentUser);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {/* if there is currentUser (which is set in the context, then show SIGN OUT, otherwise, show SIGN IN) */}
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
        {/* if true, returns the last thing: <CartDropdown /> */}
      </NavigationContainer>

      <Outlet />
    </Fragment>
  );
};

export default Navigation;
