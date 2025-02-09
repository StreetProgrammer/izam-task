import Header from "./Header/index";

import Menu from "./Menu/index.jsx";
import { Box } from "@mui/material/";
import { useStyles } from "./styles";

const Layout = (props) => {
  const classes = useStyles();
  const headerHeight = 98;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Header height={headerHeight} />
      <Box component="main" className={classes.mainContent}>
        <Box
          className={classes.aside}
          sx={{
            display: { sm: "none", md: "block" },
            width: { sm: "0", md: "25%" },
          }}
        >
          <Menu />
        </Box>
        <Box
          className={classes.content}
          sx={{
            width: { sm: "100%", md: "75%" },
          }}
        >
          {props.children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
