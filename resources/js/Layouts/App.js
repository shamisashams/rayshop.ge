import { useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import CursorFollower from "./components/AnimatedCursor";
import Products from "./pages/Products";
import SingleProucts from "./pages/SingleProucts";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Conditions from "./pages/Conditions";
import Account from "./pages/Account";
import Payment from "./pages/Payment";

function App() {
  const AppBody = useRef();

  // useEffect(() => {
  //   const app = document.getElementById("App");
  //   const router = document.getElementById("router");
  //   app.insertBefore(router, router.nextSibling);
  //   Scrollbar.init(AppBody.current, {
  //     damping: "0.05",
  //   });
  // }, [AppBody]);

  return (
    <>
      <CursorFollower />

      <div ref={AppBody} id="App">
        {/* <div id="router"> */}
        <Router>
          <Header />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/products" exact element={<Products />} />
            <Route path="/single-product" exact element={<SingleProucts />} />
            <Route path="/signup" exact element={<Signup />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/forgot-password" exact element={<ForgotPassword />} />
            <Route path="/about" exact element={<About />} />
            <Route path="/contact" exact element={<Contact />} />
            <Route path="/conditions" exact element={<Conditions />} />
            <Route path="/account" exact element={<Account />} />
            <Route path="/payment" exact element={<Payment />} />
          </Routes>
          <Footer />
        </Router>
        {/* </div> */}
      </div>
    </>
  );
}

export default App;
