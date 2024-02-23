import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Local imports
import styles from "./Header.module.css";
import CartSvg from "../../svg/CartSvg";
import FavouriteSvg from "../../svg/FavouriteSvg";
import Button from "../../UI/Button/Button";
import Profile from "../../UI/Profile/Profile";
import DashboardSvg from "../../svg/DashboardSvg";
import { logout } from "../../utils/features/user/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favourites = useSelector(({ favourites }) => favourites.items);
  const cart = useSelector(({ cart }) => cart.items);
  const userData = useSelector(({ user }) => user.userData);
  const { image, firstName, lastName, email } = userData || {};
  const [dropdown, setDropdown] = useState(false);

  const handleDropdown = useCallback(() => {
    setDropdown(!dropdown);
  }, [setDropdown, dropdown]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <DashboardSvg
        onClick={() => navigate("/")}
        className={styles.dashboardBtn}
      />
      <div className={styles.icons}>
        <div className={styles.link} onClick={() => navigate("/favourites")}>
          <FavouriteSvg />
          {favourites.length > 0 ? (
            <span className={styles.count}>{favourites.length}</span>
          ) : null}
        </div>

        <div className={styles.link} onClick={() => navigate("/cart")}>
          <CartSvg />
          {userData && cart.length > 0 ? (
            <span className={styles.count}>{cart.length}</span>
          ) : null}
        </div>

        {!userData ? (
          <Button text="Login" onClick={() => navigate("/login")} />
        ) : (
          <Profile image={image} handleDropdown={handleDropdown} />
        )}
      </div>
      {dropdown ? (
        <div className={styles.dropdown}>
          <span>
            {firstName} {lastName}
          </span>
          <span>{email}</span>
          <Button
            text={"Logout"}
            className={styles.logout}
            onClick={handleLogout}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Header;
