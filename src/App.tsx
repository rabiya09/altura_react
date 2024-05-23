import React from "react";
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";
import Footer from "./pages/common/Footer";
import Header from "./pages/common/Header";
import Nav from "./pages/common/Nav";
import Routers from "./router";

function App() {
  return (
    <>
    
    <div className="App">
    <BrowserRouter>
      <Header/>
    <Nav/>
        <Routers />
        <Footer/>
        </BrowserRouter>
      
    </div>
   
    </>
  );
}

export default App;
