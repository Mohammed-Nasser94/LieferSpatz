import "./App.css";
import Home from "../src/Components/Home/Home";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Contactus from "./Components/Contactus/Contactus";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import SignupRestaurant from "./Components/SignupRestaurant/SignupRestaurant";
import SignupCustomer from "./Components/SignupCustomer/SignupCustomer";
import LoginRestaurant from "./Components/LoginRestaurant/LoginRestaurant";
import LoginCustomer from "./Components/LoginCustomer/LoginCustomer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="" element={<Home />} />
        <Route path="contactus" element={<Contactus />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="signupowner" element={<SignupRestaurant />} />
        <Route path="signupcustomer" element={<SignupCustomer />} />
        <Route path="loginrestaurant" element={<LoginRestaurant />} />
        <Route path="logincustomer" element={<LoginCustomer />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
