import { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import "./App.css";
import { LoaderContext } from "./context/loader.jsx";
import * as ROUTES from "./constants/routes";
import * as Pages from "./pages/index.jsx";
import Navbar from "./components/Nav/Navbar.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import ProfilePage from "./pages/user/ProfilePage.jsx";
import SponsorsPage from "./pages/sponsors/SponsorsPage.jsx";
import TownscriptWidget from "./utils/townscript-pay.jsx";
import Cashfree from "./utils/cashfree.jsx";

import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "./constants/key";

import { UserContext } from "./context/user.jsx";
import { getUserDetailsAPI } from "./services/user";
import { campusAmbassodorAPI } from "./services/campusAmbassadorAPI.js";
import Footer from "./components/footer/Footer.jsx";
import CertificatePage from "./pages/user/CertificatePage.jsx";
import CertficateListView from "./pages/user/CertificateListView.jsx";
//import Sponsor from "./pages/sponsors/Sponsor.jsx";

function RequireAuth() {
  const token = localStorage.getItem("hestiaUserToken");
  if (token?.length > 0) return <Outlet />;
  else return <Navigate to="/" element={<Pages.Home />} exact />;
}

function App() {
  const { userState, tokenState } = useContext(UserContext);
  const [token, setToken] = tokenState;
  const [userDetails, setUserDetails] = userState;
  const { setLoader } = useContext(LoaderContext);

  useEffect(() => {
    (async () => {
      setLoader(true);
      const loggedInUser = localStorage.getItem(USER_STORAGE_KEY);
      const loggedInUserToken = localStorage.getItem(TOKEN_STORAGE_KEY);
      try {
        if (
          loggedInUser !== null &&
          loggedInUserToken !== null &&
          loggedInUser.length > 0 &&
          loggedInUserToken.length > 0
        ) {
          const user = await JSON.parse(loggedInUser);
          const response = await getUserDetailsAPI(loggedInUserToken);


          if (response.status === 200) {
            const userData = await response.json();
            setUserDetails(userData);
            setToken(loggedInUserToken);
          }
        }
      } catch (e) {
        console.error(e);
      }
      finally {
        setLoader(false)
      }
    })();
  }, [setToken, setUserDetails]);

  return (
    <>
      <div className=" overflow-x-hidden max-w-screen">
        <BrowserRouter>
          <Navbar />
          {/* <PopUp popUp={popUp} /> */}
          <Routes>
            <Route path={ROUTES.HOME} element={<Pages.Home />} exact />
            {/* <Route path={ROUTES.COMINGSOON} element={<Pages.ComingSoon />} exact /> */}
            <Route
              path={ROUTES.CAMPUSAMBASSADOR}
              element={<Pages.CampusAmbassador />}
              exact
            />
            <Route path={ROUTES.MERCHANDISE} element={<Pages.Merchandise />} exact />
            {/* <Route path={ROUTES.SPONSORS} element={<Pages.Sponsors />} exact /> */}
            <Route path="/cashfree" element={<Cashfree />} />
            <Route path={ROUTES.SPONSORS} element={<SponsorsPage />} />
            <Route path={ROUTES.EVENTS} element={<Pages.Events />} exact />
            <Route path={ROUTES.LOGINPAGE} element={<LoginPage />} exact />
            <Route path={ROUTES.CONTACTUS} element={<Pages.Contact />} exact />
            <Route path={ROUTES.COMBOS} element={<Pages.Combos />} exact />
            <Route path={ROUTES.COMBOS_PAGE} element={<Pages.ComboDetailViewPage />} exact />
            <Route path="*" exact={true} element={<Pages.NotFound />} />
            <Route
              path={ROUTES.EVENTS_CATEGORY}
              element={<Pages.EventsCollection />}
              exact
            />
            <Route
              path={ROUTES.EVENT_DETAILS}
              element={<Pages.EventDetails />}
              exact
            />
            <Route
              path={ROUTES.CERTIFICATES_VERIFICATION}
              element={<Pages.CertificateVerification />}
              exact
            />
            <Route
                    index
                    path={ROUTES.CERTIFICATE_PAGE}
                    element={<CertificatePage />}
                    exact
                  />
            <Route
                    index
                    path={ROUTES.CERTIFICATE_LIST}
                    element={<CertficateListView />}
                    exact
                  />
            <Route element={<RequireAuth />}>
              <Route
                path={ROUTES.CREATE_TEAM}
                element={<Pages.CreateTeam />}
                exact
              />
              <Route
                path={ROUTES.TEAM_DETAILS}
                element={<Pages.TeamDetails />}
                exact
              />
              <Route path={ROUTES.DASHBOARD}>
                <Route
                  index
                  path={ROUTES.DASHBOARD}
                  element={<Pages.Dashboard />}
                  exact
                />
                <Route
                  path={ROUTES.NOTIFICATIONS}
                  element={<Pages.Notifications />}
                  exact
                />
                <Route
                  path={ROUTES.CERTIFICATES}
                  element={<Pages.Certificates />}
                  exact
                />
                <Route path={ROUTES.PROFILE} element={<Pages.Profile />} exact />
                {/* <Route path={"/profile"} element={<ProfilePage />} exact /> */}
                {/* <Route 
                  path={ROUTES.CERTIFICATES}
                  element={<Pages.Certificates />}
                  exact
                />*/}
              </Route>
            </Route>
            <Route
              path={ROUTES.TERMS_AND_CONDITIONS}
              element={<Pages.TermsandConditions />}
              exact
            />
            <Route
              path={ROUTES.ABOUT_US}
              element={<Pages.AboutUs />}
              exact
            />
            <Route path={ROUTES.PRICING} element={<Pages.Pricing />} exact />
            <Route
              path={ROUTES.PRIVACY_POLICIES}
              element={<Pages.PrivacyPolicy />}
              exact
            />
            <Route
              path={ROUTES.REFUND_POLICY}
              element={<Pages.RefundPolicy />}
              exact
            />
            <Route
              path={ROUTES.SHIPPING}
              element={<Pages.Shipping />}
              exact
            />
          </Routes>

          <div className="w-full">

            <Footer />
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
