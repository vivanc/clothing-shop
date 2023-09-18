import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context.js";
import { signOutUser } from "../../utils/firebase/firebase.utils.js";
import "./navigation.styles.scss";

const Navigation = () => {
  //step 1 (context)
  const { currentUser } = useContext(UserContext);

  console.log(currentUser);

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
        </div>
      </div>

      <Outlet />
    </Fragment>
  );
};

export default Navigation;
