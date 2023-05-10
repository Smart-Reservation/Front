import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainPage from "./routes/MainPage";
import ReservationPage from "./routes/ReservationPage";
import SettingPage from "./routes/SettingPage";
import ReservationDetailPage from "./routes/ReservationDetailPage";
import ReservationListPage from "./routes/ReservationListPage";
import { StoreInfoProvider } from "./context/StoreInfoContext";
import { UserInfoProvider } from "./context/UserInfoContext";
import { ReservationInfoProvider } from "./context/ReservationInfoContext";
import ScrollToTop from "./components/ScrollTop";
import QRReadPage from "./routes/QRReadPage";

function App() {
  return (
    <UserInfoProvider>
      <StoreInfoProvider>
        <ReservationInfoProvider>
          <Router>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<MainPage />}></Route>
              <Route path="/ReservationPage" element={<ReservationPage />}></Route>
              <Route path="/SettingPage" element={<SettingPage />}></Route>
              <Route path="/ReservationDetailPage" element={<ReservationDetailPage />} ></Route>
              <Route path="/ReservationListPage" element={<ReservationListPage />} ></Route>
              <Route path="/QRScan" element={<QRReadPage />}></Route>  
            </Routes>
            {/* <Copyright/> */}
          </Router>
        </ReservationInfoProvider>
      </StoreInfoProvider>
    </UserInfoProvider>
  );
}

export default App;
