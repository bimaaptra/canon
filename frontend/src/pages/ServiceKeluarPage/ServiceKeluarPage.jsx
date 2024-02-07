import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { WithAuthProtection } from "../../components/withAuthProtection";

const ServiceKeluar = () => {
  return (
    <>
      <Header />
      <section></section>
      <Footer />
    </>
  );
};

export default WithAuthProtection(ServiceKeluar);
