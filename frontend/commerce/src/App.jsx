import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./Components/Navbar";
import Contact from "./pages/Contact";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { Profile } from "./pages/Profile";
import { PrivateRoute } from "./Components/PrivateRoute";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />

        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <About />
            </>
          }
        />

        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
            </>
          }
        />
        <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />}/>
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
