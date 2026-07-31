import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import store from "./store/store.js"; // Хранилище
import { Provider } from "react-redux";
import "./styles/reset.scss";
import "./styles/vars.scss";
import "./styles/common.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
