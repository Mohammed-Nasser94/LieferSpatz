import "./App.css";
import Landing from "./Components/Landing/Landing";

import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Contactus from "./Components/Contactus/Contactus";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import SignupRestaurant from "./Components/SignupRestaurant/SignupRestaurant";
import SignupCustomer from "./Components/SignupCustomer/SignupCustomer";
import LoginRestaurant from "./Components/LoginRestaurant/LoginRestaurant";
import LoginCustomer from "./Components/LoginCustomer/LoginCustomer";
import Home from "./Components/Home/Home";
import Restaurant from "./Components/Restaurant/Restaurant";
import MenuWrapper from "./Components/MenuWrapper/MenuWrapper";
import Orders from "./Components/Orders/Orders"; // Import the Orders component
import Order from "./Components/Order/Order"; // Import the new Order component

function App() {
  return (
    <>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="landing" element={<Landing />} />
          <Route path="" element={<Landing />} />
          <Route path="home" element={<Home />} />
          <Route path="restaurant/:id" element={<Restaurant />} />
          <Route path="contactus" element={<Contactus />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="restaurant" element={<SignupRestaurant />} />
          <Route path="customer" element={<SignupCustomer />} />
          <Route path="loginrestaurant" element={<LoginRestaurant />} />
          <Route path="customer/login" element={<LoginCustomer />} />
          <Route path="/restaurant/:restaurantId/menu" element={<MenuWrapper />} />
          <Route path="/customer/:customerId/orders" element={<Orders />} /> 
          <Route path="/order" element={<Order />} /> 
        </Routes>
      </div>
    </>
  );
}

export default App;
