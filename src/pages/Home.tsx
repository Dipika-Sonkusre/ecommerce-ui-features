import { useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { showToast } from "../utils/toastHandler";
import { ApiEndpoint } from "../enum";
import { clearAuthToken } from "../utils/clearAuthToken";
import { setUserLoggedIn } from "../redux/authSlice";

export default function Home() {
  const { totalQuantity } = useAppSelector((state) => state.cart);
  const isLoggedIn = useAppSelector((state) => state.login.loggedIn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCartClick = () => {
    if (totalQuantity > 0) {
      navigate("/cart");
    } else {
      showToast(
        "Your cart is empty. Please add some products to proceed.",
        "info"
      );
    }
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const handleMenuClose = () => setAnchorEl(null);

  const handleLogin = () => {
    navigate(ApiEndpoint.AUTH_LOGIN);
  };

  const handleLogout = () => {
    // Logout logic
    clearAuthToken();
    dispatch(setUserLoggedIn(false));
    handleMenuClose();
    showToast("You have logged out successfully.", "success");
  };

  const handleViewProfile = () => {
    navigate(ApiEndpoint.USER_PROFILE);
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      dispatch(setUserLoggedIn(true));
    } else {
      dispatch(setUserLoggedIn(false));
    }
  }, [dispatch]);

  return (
    <>
      <AppBar position="sticky" color="primary">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Left: Logo */}
          <Typography component="div" sx={{ cursor: "pointer" }}>
            MyLogo
          </Typography>

          <Box sx={{ display: "flex", gap: "10px" }}>
            <IconButton
              sx={{ position: "relative", cursor: "pointer" }}
              onClick={handleCartClick}
            >
              <ShoppingCartIcon sx={{ color: "white" }} />
              <Box
                sx={{
                  position: "absolute",
                  top: -10,
                  right: 0,
                  color: "white",
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                <Typography>{totalQuantity}</Typography>
              </Box>
            </IconButton>

            {/* Right: Profile menu OR Login button */}
            {isLoggedIn ? (
              <Box>
                <IconButton onClick={handleMenuOpen} size="large" sx={{ p: 0 }}>
                  <Avatar alt="User" src="/static/images/avatar/1.jpg" />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <MenuItem onClick={handleViewProfile}>View Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>
            ) : (
              <Button color="inherit" onClick={handleLogin}>
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Outlet />
    </>
  );
}
