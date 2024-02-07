import { Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ClaimGaransi from "./pages/ClaimGaransiPage/ClaimGaransiPage";
import DataKonsumen from "./pages/DataKonsumenPage/DataKonsumenPage";
import PenawaranPage from "./pages/PenawaranPage/PenawaranPage";
import ServiceKeluar from "./pages/ServiceKeluarPage/ServiceKeluarPage";
import ServiceMasuk from "./pages/ServiceMasukPage/ServiceMasukPage";
import { WithAuthProtection } from "./components/withAuthProtection";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/claim-garansi" element={<ClaimGaransi />} />
      <Route path="/data-konsumen" element={<DataKonsumen />} />
      <Route path="/penawaran" element={<PenawaranPage />} />
      <Route path="/service-keluar" element={<ServiceKeluar />} />
      <Route path="/service-masuk" element={<ServiceMasuk />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
