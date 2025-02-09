import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Menu as MuiMenu,
  MenuItem,
  Switch,
  Drawer,
  IconButton,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { useStyles } from "./styles.js";
import Job from "../../components/Job/index.jsx";
import { KeyboardArrowDown, MenuOutlined } from "@mui/icons-material";

import Menu from "../../components/Layout/Menu/index.jsx";

const Home = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isMobileMenuDrawerOpend, setIsMobileMenuDrawerOpend] =
    React.useState(false);
  const jobs = [
    {
      title: "Gaming UI designer",
      location: "ElMansoura, Egypt",
      cratedAt: "10 days ago",
      company: {
        title: "Rockstar Games",
        logo: "https://static8.depositphotos.com/1378583/1010/i/450/depositphotos_10108949-stock-photo-blue-flame-logo.jpg",
      },
      slugs: ["0 - 3y of exp", "Full time", "Remote"],
      categories: ["Creative / Design", "IT / Software development", "Gaming"],
    },
    {
      title: "Senior UX UI Designer",
      location: "Cairo, Egypt",
      cratedAt: "month ago",
      company: {
        title: "Egabi",
        logo: "https://static8.depositphotos.com/1378583/1010/i/450/depositphotos_10108949-stock-photo-blue-flame-logo.jpg",
      },
      slugs: ["0 - 3y of exp", "Full time", "Hybrid"],
      categories: ["Creative / Design", "IT / Software development"],
    },
    {
      title: "React Frontend developer",
      location: "ElMansoura, Egypt",
      cratedAt: "10 days ago",
      company: {
        title: "Rockstar Games ",
        logo: "https://static8.depositphotos.com/1378583/1010/i/450/depositphotos_10108949-stock-photo-blue-flame-logo.jpg",
      },
      slugs: ["0 - 3y of exp", "Full time", "Remote"],
      categories: ["Creative / Design", "IT / Software development", "Gaming"],
    },
    {
      title: "Senior UX UI Designer",
      location: "Cairo, Egypt",
      cratedAt: "month ago",
      company: {
        title: "Egabi",
        logo: "",
      },
      slugs: ["0 - 3y of exp", "Full time", "Hybrid"],
      categories: ["Creative / Design", "IT / Software development"],
    },
  ];
  const classes = useStyles();

  return (
    <Box
      style={{
        display: "flex",
      }}
    >
      <Stack
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          width: "100%",
        }}
        direction="column"
        spacing={2}
      >
        {/*  */}
        <Box className={classes.sort}>
          <CustomizedMenus />
        </Box>
        <Box className={classes.infoAndAlertAndMobileMenuTrigger}>
          <Card className={classes.infoAndAlert}>
            <CardContent>
              <Box className={classes.jobUpper}>
                <Typography
                  variant="h6"
                  sx={{ padding: 2 }}
                  className={classes.categories}
                >
                  UI Designer in Egypt
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ padding: 2 }}
                  className={classes.categories}
                >
                  70 job positions
                </Typography>
              </Box>
              <Box className={classes.alert}>
                <Typography variant="caption" className={classes.categories}>
                  Set alert
                </Typography>
                <Switch defaultChecked color="default" />
              </Box>
            </CardContent>
          </Card>
          <IconButton
            onClick={() => setIsMobileMenuDrawerOpend(true)}
            sx={{
              display: { sm: "block", md: "none" },
            }}
          >
            <MenuOutlined />
          </IconButton>
        </Box>
        {/*  */}

        {jobs.map((job) => (
          <Job
            job={job}
            selectedJob={selectedJob}
            setSelectedJob={setSelectedJob}
          />
        ))}

        <MobileMenuDrawer
          open={isMobileMenuDrawerOpend}
          setOpen={setIsMobileMenuDrawerOpend}
        />
      </Stack>
    </Box>
  );
};

const StyledMenu = styled((props) => (
  <MuiMenu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
    ...theme.applyStyles("dark", {
      color: theme.palette.grey[300],
    }),
  },
}));

const CustomizedMenus = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Box
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDown />}
      >
        Options
        <KeyboardArrowDown />
      </Box>
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose} disableRipple>
          Top match
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          Newest
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          Latest
        </MenuItem>
      </StyledMenu>
    </div>
  );
};

const MobileMenuDrawer = ({ open, setOpen }) => {
  return (
    <Drawer open={open} onClose={() => setOpen(false)} anchor="right">
      <Menu handleCloseDrawer={() => setOpen(false)} />
    </Drawer>
  );
};

export default Home;
