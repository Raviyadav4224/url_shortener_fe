import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";

import "./index.css";
import { worker } from "./mocks/worker";
import { routes } from "./routes";
import { store } from "./store";

if (!import.meta.env.DEV) {
  worker.start({
    onUnhandledRequest: "bypass",
  });
}
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </Provider>
  </StrictMode>
);
