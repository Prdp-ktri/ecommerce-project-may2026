import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { createContext, lazy, Suspense, useEffect, useState } from "react";
import Loader from "./components/admin/Loader";
import { Slide, ToastContainer } from "react-toastify";
// import Header from "./components/admin/AdminHeader";
import BuyerCreation from "./modules/buyer/BuyerCreation";
import SellerCreation from "./modules/seller/SellerCreation";
import LoginPortal from "./modules/login/LoginPortal";
import AddProduct from "./components/admin/AddProduct";
import ViewProducts from "./components/admin/ViewProducts";
import ManageProducts from "./components/admin/ManageProducts";
import AllLatchableProducts from "./modules/seller/AllLatchableProducts";
import AdminHeader from "./components/admin/AdminHeader";
import SellerHeader from "./components/seller/SellerHeader";
import BuyerHeader from "./components/buyer/BuyerHeader";
import LatchedProducts from "./modules/seller/LatchedProducts";
import { LatchedProductsProvider } from "./context/LatchedProductsContext";
import ViewAllProducts from "./modules/buyer/ViewAllProducts";
import ProductDetails from "./modules/buyer/ProductDetails";
import Cart from "./modules/buyer/Cart";
import PlaceOrder from "./modules/buyer/PlaceOrder";
import TrackYourOrder from "./modules/buyer/TrackYourOrder";
import TrackingPage from "./modules/buyer/TrackingPage";
import DeliveredOrders from "./modules/buyer/DeliveredOrders";
import EditProfile from "./modules/buyer/EditProfile";
import ViewProfile from "./modules/buyer/ViewProfile";
import SearchProducts from "./modules/buyer/SearchProducts";
import ManageProfile from "./modules/seller/ManageProfile";
import NewOrders from "./modules/seller/NewOrders";
import AllSellersList from "./components/admin/AllSellersList";
import AllBuyersList from "./components/admin/AllBuyersList";
import ManageAdmin from "./components/admin/ManageAdmin";
import ProtectedRoute from "./modules/auth/ProtectedRoute";

export const AdminLoginContext = createContext();
export const BuyerLoginContext = createContext();
export const SellerLoginContext = createContext();
export const LoginContext = createContext();

const AdminLoginCredentials = lazy(
  () => import("./modules/admin/AdminLoginCredentials"),
);
const AdminDashboard = lazy(() => import("./modules/admin/AdminDashboard"));

const BuyerLoginCredentials = lazy(
  () => import("./modules/buyer/BuyerLoginCredentials"),
);
const BuyerDashboard = lazy(() => import("./modules/buyer/BuyerDashboard"));

const SellerLoginCredentials = lazy(
  () => import("./modules/seller/SellerLoginCredentials"),
);
const SellerDashboard = lazy(() => import("./modules/seller/SellerDashboard"));

const EditProductDetails = lazy(
  () => import("./components/admin/EditProductDetails"),
);

function HeaderWrapper({ adminLogin, sellerLogin, buyerLogin }) {
  const location = useLocation();

  const noHeaderaRoutes = [
    "/",
    "/sellerCreation",
    "/sellerLogin",
    "/buyerLogin",
    "/buyerCreation",
    "/adminLogin",
  ];

  if (noHeaderaRoutes.includes(location.pathname)) {
    return null;
  }

  if (adminLogin) return <AdminHeader />;
  if (sellerLogin) return <SellerHeader />;
  if (buyerLogin) return <BuyerHeader />;

  return null;
}

function App() {
  const isAuthenticated = true;

  const [login, setLogin] = useState(
    () => JSON.parse(localStorage.getItem("login")) || false,
  );

  const [adminLogin, setAdminLogin] = useState(
    () => JSON.parse(localStorage.getItem("adminLogin")) || false,
  );

  const [buyerLogin, setBuyerLogin] = useState(
    () => JSON.parse(localStorage.getItem("buyerLogin")) || false,
  );

  const [sellerLogin, setSellerLogin] = useState(
    () => JSON.parse(localStorage.getItem("sellerLogin")) || false,
  );

  useEffect(() => {
    localStorage.setItem("adminLogin", JSON.stringify(adminLogin));
    localStorage.setItem("buyerLogin", JSON.stringify(buyerLogin));
    localStorage.setItem("sellerLogin", JSON.stringify(sellerLogin));
    localStorage.setItem("login", JSON.stringify(login));
  }, [login, adminLogin, sellerLogin, buyerLogin]);

  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        transition={Slide}
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <BrowserRouter>
        <LoginContext.Provider value={{ login, setLogin }}>
          <AdminLoginContext.Provider value={{ adminLogin, setAdminLogin }}>
            <BuyerLoginContext.Provider value={{ buyerLogin, setBuyerLogin }}>
              <SellerLoginContext.Provider
                value={{ sellerLogin, setSellerLogin }}
              >
                <HeaderWrapper
                  adminLogin={adminLogin}
                  sellerLogin={sellerLogin}
                  buyerLogin={buyerLogin}
                />

                <LatchedProductsProvider>
                  <Routes>
                    {/* Login Routes */}
                    <Route
                      path="/"
                      element={
                        <Suspense fallback={<Loader />}>
                          <LoginPortal />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/buyerLogin"
                      element={
                        <Suspense fallback={<Loader />}>
                          <BuyerLoginCredentials />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/adminLogin"
                      element={
                        <Suspense fallback={<Loader />}>
                          <AdminLoginCredentials />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/sellerLogin"
                      element={
                        <Suspense fallback={<Loader />}>
                          <SellerLoginCredentials />
                        </Suspense>
                      }
                    />

                    <Route
                      element={
                        <ProtectedRoute isAuthenticated={isAuthenticated} />
                      }
                    >
                      {/* Admin */}
                      <Route
                        path="/adminDashboard"
                        element={
                          <Suspense fallback={<Loader />}>
                            {adminLogin ? (
                              <AdminDashboard />
                            ) : (
                              <Navigate to="/" />
                            )}
                          </Suspense>
                        }
                      />
                      <Route
                        path="/addProduct"
                        element={
                          <Suspense fallback={<Loader />}>
                            <AddProduct />
                          </Suspense>
                        }
                      />
                      <Route
                        path="/viewProducts"
                        element={
                          <Suspense fallback={<Loader />}>
                            <ViewProducts />
                          </Suspense>
                        }
                      />
                      <Route
                        path="/editProductDetails/:id"
                        element={
                          <Suspense fallback={<Loader />}>
                            <EditProductDetails />
                          </Suspense>
                        }
                      />
                      <Route
                        path="/manageProducts"
                        element={
                          <Suspense fallback={<Loader />}>
                            <ManageProducts />
                          </Suspense>
                        }
                      />
                      <Route
                        path="/full-seller-list"
                        element={
                          <Suspense fallback={<Loader />}>
                            <AllSellersList />
                          </Suspense>
                        }
                      />
                      <Route
                        path="/full-buyers-list"
                        element={
                          <Suspense fallback={<Loader />}>
                            <AllBuyersList />
                          </Suspense>
                        }
                      />
                      <Route
                        path="/manage-admin"
                        element={
                          <Suspense fallback={<Loader />}>
                            <ManageAdmin />
                          </Suspense>
                        }
                      />

                      {/* Buyer */}
                      <Route
                        path="/buyerCreation"
                        element={
                          <Suspense fallback={<Loader />}>
                            <BuyerCreation />
                          </Suspense>
                        }
                      />

                      <Route
                        path="/buyerDashboard"
                        element={
                          <Suspense fallback={<Loader />}>
                            <BuyerDashboard />
                          </Suspense>
                        }
                      />
                      <Route
                        path="/viewAllProducts"
                        element={
                          <Suspense fallback={<Loader />}>
                            <ViewAllProducts />
                          </Suspense>
                        }
                      />
                      <Route
                        path="/searchProducts"
                        element={
                          <Suspense fallback={<Loader />}>
                            <SearchProducts />
                          </Suspense>
                        }
                      />
                      <Route
                        path="/product/:id"
                        element={
                          <Suspense fallback={<Loader />}>
                            <ProductDetails />
                          </Suspense>
                        }
                      />
                      <Route
                        path="/cart"
                        element={
                          <Suspense fallback={<Loader />}>
                            <Cart />
                          </Suspense>
                        }
                      />
                      <Route
                        path="/place-order"
                        element={
                          <Suspense fallback={<Loader />}>
                            <PlaceOrder />
                          </Suspense>
                        }
                      />
                      <Route
                        path="/track-your-order/:orderId"
                        element={
                          <Suspense fallback={<Loader />}>
                            <TrackYourOrder />
                          </Suspense>
                        }
                      />
                      <Route
                        path="/track-your-order"
                        element={
                          <Suspense fallback={<Loader />}>
                            <TrackingPage />
                          </Suspense>
                        }
                      />
                      <Route
                        path="/deliveredorders"
                        element={
                          <Suspense fallback={<Loader />}>
                            <DeliveredOrders />
                          </Suspense>
                        }
                      />
                      <Route
                        path="/edit-profile"
                        element={
                          <Suspense fallback={<Loader />}>
                            <EditProfile />
                          </Suspense>
                        }
                      />
                      <Route
                        path="/view-profile"
                        element={
                          <Suspense fallback={<Loader />}>
                            <ViewProfile />
                          </Suspense>
                        }
                      />

                      {/* Seller */}
                      <Route
                        path="/sellerCreation"
                        element={
                          <Suspense fallback={<Loader />}>
                            <SellerCreation />
                          </Suspense>
                        }
                      />
                      <Route
                        path="/sellerDashboard"
                        element={
                          <Suspense fallback={<Loader />}>
                            <SellerDashboard />
                          </Suspense>
                        }
                      />
                      <Route
                        path="/manage-profile"
                        element={
                          <Suspense fallback={<Loader />}>
                            <ManageProfile />
                          </Suspense>
                        }
                      />
                      <Route
                        path="/new-orders-of-seller"
                        element={
                          <Suspense fallback={<Loader />}>
                            <NewOrders />
                          </Suspense>
                        }
                      />
                      <Route
                        path="/allLatchableProducts"
                        element={
                          <Suspense fallback={<Loader />}>
                            <AllLatchableProducts />
                          </Suspense>
                        }
                      />
                      <Route
                        path="/latchedProducts"
                        element={
                          <Suspense fallback={<Loader />}>
                            <LatchedProducts />
                          </Suspense>
                        }
                      />
                    </Route>
                  </Routes>
                </LatchedProductsProvider>
              </SellerLoginContext.Provider>
            </BuyerLoginContext.Provider>
          </AdminLoginContext.Provider>
        </LoginContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
