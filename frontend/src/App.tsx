import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddTourPackage from "./pages/AddTourPackage";
import { useAppContext } from "./contexts/AppContext";
import MyTourPackages from "./pages/MyTourPackages";
import EditTourPackage from "./pages/EditTourPackage";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import MyBookedPackages from "./pages/MyBookedPackages";
import Home from "./pages/Home";

const App = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />
        <Route
          path="/detail/:tourpackageId"
          element={
            <Layout>
              <Detail />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />

        {isLoggedIn && (
          <>
            <Route
              path="/tourpackage/:tourpackageId/booking"
              element={
                <Layout>
                  <Booking />
                </Layout>
              }
            />

            <Route
              path="/add-tourpackage"
              element={
                <Layout>
                  <AddTourPackage />
                </Layout>
              }
            />
            <Route
              path="/edit-tourpackage/:tourpackageId"
              element={
                <Layout>
                  <EditTourPackage />
                </Layout>
              }
            />
            <Route
              path="/my-tourpackages"
              element={
                <Layout>
                  <MyTourPackages />
                </Layout>
              }
            />
            <Route
              path="/my-bookings"
              element={
                <Layout>
                  <MyBookings />
                </Layout>
              }
            />
            <Route
              path="/my-bookedpackages"
              element={
                <Layout>
                  <MyBookedPackages />
                </Layout>
              }
            />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
