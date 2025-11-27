import "./tailwind.css";
import "react-simple-toasts/dist/style.css";
import "react-simple-toasts/dist/theme/dark.css";

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import toast, { toastConfig } from "react-simple-toasts";

toastConfig({ theme: "dark" });

createRoot(document.getElementById("root")!).render(<App />);
