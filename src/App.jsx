import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AppContextProvider from "./utils/AppContext";
import Cart from "./Pages/Cart/Cart";
import Header from "./Components/Header/Header";
import Product from "./Pages/Product/Product";
import Favourites from "./Pages/Favourites/Favourites";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkUserSession } from "./utils/features/user/userSlice";

const App = () => {
  const dispatch = useDispatch();

  const HeaderWrapper = ({ children }) => (
    <>
      <Header />
      {children}
    </>
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <HeaderWrapper>
          <Dashboard />
        </HeaderWrapper>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/cart",
      element: (
        <HeaderWrapper>
          <Cart />
        </HeaderWrapper>
      ),
    },
    {
      path: "/favourites",
      element: (
        <HeaderWrapper>
          <Favourites />
        </HeaderWrapper>
      ),
    },
    {
      path: "/product/:id",
      element: (
        <HeaderWrapper>
          <Product />
        </HeaderWrapper>
      ),
    },
  ]);

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <div className="App">
      <AppContextProvider>
        <RouterProvider router={router} />
      </AppContextProvider>
    </div>
  );
};

export default App;
