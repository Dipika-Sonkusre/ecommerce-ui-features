import { useState } from "react";
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
import { useAppSelector } from "../redux/hooks";
import { showToast } from "../utils/toastHandler";
import { ApiEndpoint } from "../enum";

export default function Home() {
  const { totalQuantity } = useAppSelector((state) => state.cart);
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

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const handleMenuClose = () => setAnchorEl(null);

  const handleLogin = () => {
    navigate(ApiEndpoint.AUTH_LOGIN);
  };

  const handleLogout = () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
      // Logout logic
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setIsLoggedIn(false);
      handleMenuClose();
      showToast("You have logged out successfully.", "success");
    }
  };

  return (
    <>
      <AppBar position="sticky" color="primary">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Left: Logo */}
          <Typography component="div" sx={{ cursor: "pointer" }}>
            MyLogo
          </Typography>

          <Box>
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
                  <MenuItem>View Profile</MenuItem>
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
