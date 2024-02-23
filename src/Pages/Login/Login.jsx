import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useForm } from "react-hook-form";
// Local imports
import styles from "./Login.module.css";
import Button from "../../UI/Button/Button";
import { LOGIN } from "../../routes/routes";
import { login } from "../../utils/features/user/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const userData = useSelector(({ user }) => user.userData);
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginHandler = async (data) => {
    try {
      const response = await axios.post(LOGIN, data);
      const userData = response.data;
      dispatch(login(userData));
    } catch (error) {
      if (error.response.status === 400) {
        setApiError(error.response.data.message);
      } else {
        setApiError("Something went wrong");
      }
    }
  };

  useEffect(() => {
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/");
    }
  }, [userData, navigate]);

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(loginHandler)} className={styles.form}>
        <h1>Login</h1>
        <div className={styles.inputContainer}>
          <input
            {...register("username", {
              required: "Username required",
            })}
            placeholder="Username"
            type="text"
            className={errors.username ? styles.error : ""}
          />
          {errors.username ? (
            <span className={styles.errorMsg}>{errors.username.message}</span>
          ) : null}
        </div>
        <div className={styles.inputContainer}>
          <input
            {...register("password", {
              required: "Password required",
            })}
            placeholder="Password"
            type="password"
            className={errors.password ? styles.error : ""}
          />
          {errors.password ? (
            <span className={styles.errorMsg}>{errors.password.message}</span>
          ) : null}
        </div>
        {errors.password ? <span>{errors.password.message}</span> : null}
        {apiError ? <span className={styles.errorMsg}>{apiError}</span> : null}
        <Button text="Login" className={styles.button} type="submit" />
        <span>Or</span>
        <Button
          text="Continue to shop"
          className={styles.button}
          onClick={() => navigate("/")}
        />
      </form>
    </div>
  );
};

export default Login;
