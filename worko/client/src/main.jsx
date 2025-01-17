import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { MyProvider } from "./context/ContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <MyProvider>
    <App />
  </MyProvider>
);
