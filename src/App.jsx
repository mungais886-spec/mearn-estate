import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./Components/Navbar";
import SignIn from "./pages/SignIn";
import Contact from "./pages/Contact";
function App() {
  return (
   <>
   <Navbar />
   <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/about' element={<About />} />
    <Route path='/signin' element={<SignIn />} />
    <Route path='/contact' element={<Contact />} />
   </Routes>
   </>
  );
}

export default App;