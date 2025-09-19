import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { decreaseQuantity, increaseQuantity } from '../redux/cartSlice';

import { useNavigate } from 'react-router';
import { Box, Button, Container, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function Cart() {
  const { cart, totalAmount, totalQuantity } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDecreaseQuantity = (productId: number) => {
    dispatch(decreaseQuantity(productId));
  };

  useEffect(() => {
    if (totalQuantity === 0) {
      navigate("/");
    }
  }, [totalQuantity]);

  return (
    <Container className="cart-container">
      <h1>My Shopping Cart</h1>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.title}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleDecreaseQuantity(product.id)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  {product.quantity}
                  <IconButton
                    onClick={() => dispatch(increaseQuantity(product.id))}
                  >
                    <AddIcon />
                  </IconButton>
                </TableCell>
                <TableCell>{product.price.toFixed(2)}</TableCell>
                <TableCell>
                  {(product.price * product.quantity).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />

      <Box className="cart-summary">
        <Box className="cart-summary-item">
          <Typography className="cart-summary-item-label">
            Total Amount
          </Typography>
          <Typography className="cart-summary-item-value">
            ${totalAmount.toFixed(2)}
          </Typography>
        </Box>

        <Box className="cart-summary-item">
          <Typography className="cart-summary-item-label">
            Total Quantity
          </Typography>
          <Typography className="cart-summary-item-value">
            {totalQuantity}
          </Typography>
        </Box>
      </Box>

      <Box className="cart-buttons">
        <Button
          variant="contained"
          className="cart-button"
          onClick={() => navigate("/")}
          size="small"
          fullWidth
        >
          Back to shop
        </Button>
        <Button
          variant="contained"
          className="cart-button"
          id="checkout-button"
          size="small"
          fullWidth
        >
          Checkout
        </Button>
      </Box>
    </Container>
  )
}
