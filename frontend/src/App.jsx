import { Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ClaimWarrantyPage from "./pages/ClaimWarrantyPage/ClaimWarrantyPage";
import CustomerPage from "./pages/CustomerPage/CustomerPage";
import OfferingPage from "./pages/OfferingPage/OfferingPage";
import ServiceOutPage from "./pages/ServiceOutPage/ServiceOutPage";
import ServiceInPage from "./pages/ServiceInPage/ServiceInPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/claim-warranty" element={<ClaimWarrantyPage />} />
      <Route path="/customer" element={<CustomerPage />} />
      <Route path="/offering" element={<OfferingPage />} />
      <Route path="/service-out" element={<ServiceOutPage />} />
      <Route path="/service-in" element={<ServiceInPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
