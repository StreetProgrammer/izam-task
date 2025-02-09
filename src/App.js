import './App.css';
import { Outlet} from "react-router";
import Layout from "./components/Layout/index";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  return (    
    <>
      <CssBaseline />
        <Layout>
          <Outlet />
        </Layout>
    </>
    
  );
}

export default App;
