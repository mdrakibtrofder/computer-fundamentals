import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import 'devextreme/dist/css/dx.material.blue.dark.compact.css';
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
