import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import MainPage from "./routes/MainPage";
import LoginPage from "./routes/LoginPage";
import ReservationPage from "./routes/ReservationPage";
import SettingPage from "./routes/SettingPage";
import ReservationDetailPage from "./routes/ReservationDetailPage";
import ReservationListPage from "./routes/ReservationListPage";
import { ReservationInfoProvider } from "./context/ReservationInfoContext";
import { UserInfoProvider } from "./context/UserInfoContext";
import ScrollToTop from "./components/ScrollTop";


function App(){
  return (
    <UserInfoProvider>
        <ReservationInfoProvider>
        <Router>
          <ScrollToTop/>  
          <Routes>
            <Route path="/" element={
              <MainPage />
            }>
            <Route path="/LoginPage" element={
              <LoginPage />
            }></Route>
            </Route>
            <Route path="/ReservationPage" element={
              <ReservationPage />
            }>
            </Route>
            <Route path="/SettingPage" element={
              <SettingPage />
            }>
            </Route>
            <Route path="/ReservationDetailPage" element={
              <ReservationDetailPage />
            }>
            </Route>
            <Route path="/ReservationLitPage" element={
              <ReservationListPage />
            }>
            </Route>
          </Routes>
          {/* <Copyright/> */}
        </Router>
      </ReservationInfoProvider>
    </UserInfoProvider> 
  )
}

export default App;
