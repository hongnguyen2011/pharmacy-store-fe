import React from "react";
import ReactDOM from "react-dom/client";
import "remixicon/fonts/remixicon.css";
import "bootstrap/dist/css/bootstrap.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PostAllCategory } from "./crawl";
import UserContextProvider from "./userSide/contexts/UserContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
// PostAllCategory();
root.render(
    <UserContextProvider>
        <BrowserRouter>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                closeOnClick
                pauseOnHover={false}
                theme="dark"
            />
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </UserContextProvider>
);
