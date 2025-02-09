import * as React from "react";
import profilePic from "../../../assets/imgs/profile.jpg";
import { useStyles } from "./styles";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  Divider,
  Tooltip,
  Avatar,
  Card,
  CardHeader,
  Drawer,
} from "@mui/material";
import {
  Search as SearchIcon,
  HomeOutlined,
  WorkOutlined,
  PeopleAltOutlined,
  NotificationsOutlined,
  ChatBubbleOutlineOutlined,
  ArrowDropDownOutlined,
  KeyboardArrowRightOutlined,
  MenuOutlined,
} from "@mui/icons-material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "50px",
  backgroundColor: alpha(theme.palette.common.white, 1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.75),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  height: "60px",
  width: "25vw",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  [theme.breakpoints.between("sm", "md")]: {
    width: "20vw",
  },
}));

const settings = ["Setting and privacy", "Language", "Help"];
const mainLinks = [
  {
    title: "Home",
    icon: <HomeOutlined />,
  },
  {
    title: "Jobs",
    icon: <WorkOutlined />,
  },
  {
    title: "Employers",
    icon: <PeopleAltOutlined />,
  },
];

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  position: "absolute",
  top: 0,
  bottom: 0,
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& >span": {
    background: "#48A74C",
    width: "50px",
    height: "50px",
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(0, 1, 0, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(6)})`,
    height: "50px",
    transition: theme.transitions.create("width"),
    // width: "25vw",
    // [theme.breakpoints.between("sm", "md")]: {
    //   width: "20vw",
    // },
  },
}));

const LinkWrapper = styled("div")(({ theme }) => ({
  cursor: "pointer",
  flexDirection: "column",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingInline: "25px",
  color: "#E6E6E6",
  "&:hover": {
    color: "#FFF",
  },
  [theme.breakpoints.between("xs", "md")]: {
    paddingInline: "5px",
  },
  "& >p": {
    fontWeight: 400,
    fontSize: "1vw",
    [theme.breakpoints.between("sm", "md")]: {
      fontSize: "1.5vw",
    },
  },
}));

const BadgeAvatarWithMenuIcon = ({ OpenMobileMenuDrawer }) => {
  return (
    <Badge
      style={{ cursor: "pointer" }}
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      badgeContent={<MenuOutlined />}
      sx={{ display: { xs: "flex", md: "none" } }}
      onClick={() => OpenMobileMenuDrawer(true)}
    >
      <Avatar alt="Ahmed Amaar" src={profilePic} />
    </Badge>
  );
};

const MobileMenuDrawer = ({ open, setOpen }) => {
  return (
    <Drawer open={open} onClose={() => setOpen(false)}>
      <Card elevation={0} style={{ minWidth: "75vw" }}>
        <CardHeader
          avatar={<Avatar alt="Ahmed Amaar" src={profilePic} />}
          action={
            <IconButton aria-label="settings">
              <KeyboardArrowRightOutlined />
            </IconButton>
          }
          title="Ahmed Amaar"
          subheader="UX UI designer"
        />
        <Divider />
        {mainLinks.map((link, index) => (
          <MenuItem key={index}>
            {link.icon}{" "}
            <Typography sx={{ textAlign: "center" }}>{link.title}</Typography>
          </MenuItem>
        ))}
        <Divider />

        {settings.map((setting) => (
          <MenuItem key={setting}>
            <Typography sx={{ textAlign: "center" }}>{setting}</Typography>
          </MenuItem>
        ))}
        <Divider />
        <MenuItem>
          <Typography sx={{ textAlign: "center", color: "#ED1F03" }}>
            Logout
          </Typography>
        </MenuItem>
      </Card>
    </Drawer>
  );
};

export default function PrimarySearchAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isMobileMenuDrawerOpend, setIsMobileMenuDrawerOpend] =
    React.useState(false);

  const classes = useStyles();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box className={classes.headerWrpper} sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ flexDirection: { xs: "row-reverse", md: "row" } }}>
          <Typography
            className={classes.logo}
            variant="h4"
            noWrap
            component="div"
            sx={{ fontSize: { xs: "35px", sm: "3vw", md: "2vw" } }}
          >
            i<span>Z</span>AM
          </Typography>
          <Search sx={{ display: { xs: "none", md: "block" } }}>
            <SearchIconWrapper>
              <span>
                <SearchIcon />
              </span>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {mainLinks.map((link) => (
              <LinkWrapper>
                {link.icon}
                <Typography>{link.title}</Typography>
              </LinkWrapper>
            ))}
          </Box>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{ display: { xs: "none", md: "block" } }}
          />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <LinkWrapper>
              <NotificationsOutlined />
              <Typography>Notifications</Typography>
            </LinkWrapper>

            <LinkWrapper>
              <Badge badgeContent={3} color="error">
                <ChatBubbleOutlineOutlined />
              </Badge>
              <Typography>Messaging</Typography>
            </LinkWrapper>
            <LinkWrapper onClick={handleOpenUserMenu}>
              <Tooltip title="Open settings">
                <Avatar
                  sx={{ width: 24, height: 24 }}
                  alt="Ahmed Amaar"
                  src={profilePic}
                />
              </Tooltip>
              <Typography sx={{ display: "flex", alignItems: "center" }}>
                Profile <ArrowDropDownOutlined />
              </Typography>
            </LinkWrapper>
            <Menu
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Card elevation={0}>
                <CardHeader
                  avatar={<Avatar alt="Ahmed Amaar" src={profilePic} />}
                  action={
                    <IconButton aria-label="settings">
                      <KeyboardArrowRightOutlined />
                    </IconButton>
                  }
                  title="Ahmed Amaar"
                  subheader="UX UI designer"
                />
                <Divider />

                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: "center" }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
                <Divider />
                <MenuItem>
                  <Typography sx={{ textAlign: "center", color: "#ED1F03" }}>
                    Logout
                  </Typography>
                </MenuItem>
              </Card>
            </Menu>
          </Box>

          <BadgeAvatarWithMenuIcon
            OpenMobileMenuDrawer={setIsMobileMenuDrawerOpend}
          />
          <MobileMenuDrawer
            open={isMobileMenuDrawerOpend}
            setOpen={setIsMobileMenuDrawerOpend}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
