import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { WithAuthProtection } from "../../components/WithAuthProtection";

const HomePage = () => {
  return (
    <>
      <Header />
      <section>
        <img src="/assets/printer.png" alt="printer" />
      </section>
      <Footer />
    </>
  );
};

export default WithAuthProtection(HomePage);
