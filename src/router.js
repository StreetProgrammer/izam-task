import { createHashRouter } from "react-router-dom";
import Home from "./pages/Home";
import App from "./App";

export const router =  createHashRouter([
    {
        path: "/",
        Component: <App />,
        children: [
            {
                path: "",
                Component: <Home />
            },
        ]

    }
])