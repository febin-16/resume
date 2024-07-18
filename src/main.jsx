import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ContextProvider } from "./context/user";
import { ModalContextProvider } from "./context/modal";
import { PopUpContextProvider } from "./context/popup";
import * as ROUTES from "./constants/routes.js";
import * as Pages from "./pages/index.jsx";
import config from "./cred/Config.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LoaderContextProvider } from "./context/loader";
import { DialogPopupProvider } from "./context/dialog.jsx";
import { LoadingContextProvider } from "./context/loading.jsx";
const googleClientId = config.GOOGLE_CLIENT_ID;

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Pages.Home />,
  },
  {
    path: "/home",
    element: <div>Hello home!</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoaderContextProvider>
      <LoadingContextProvider>
        <PopUpContextProvider>
          <DialogPopupProvider>
            <ContextProvider>
              <GoogleOAuthProvider clientId={googleClientId}>
                <ModalContextProvider>
                  <App />
                </ModalContextProvider>
              </GoogleOAuthProvider>
            </ContextProvider>
          </DialogPopupProvider>
        </PopUpContextProvider>
      </LoadingContextProvider>
    </LoaderContextProvider>
  </React.StrictMode>
);
