import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Rating,
  Typography,
} from "@mui/material";
import type { ProductType } from "../interface";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchProducts } from "../redux/productAction";
import { useEffect } from "react";

export default function Product() {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Container maxWidth="xl">
      <Typography
        variant="h3"
        color="initial"
        style={{
          margin: "2rem 0",
          fontWeight: "bold",
          fontSize: "2rem",
          lineHeight: "1.2",
        }}
      >
        Products
      </Typography>
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography variant="body1" color="error" gutterBottom>
          {error}
        </Typography>
      )}

      {products?.length === 0 && (
        <Typography variant="body1" gutterBottom sx={{ textAlign: "center" }}>
          No products found.
        </Typography>
      )}

      <Box className="products-container">
        {products?.map((product: ProductType) => (
          <Card
            sx={{ maxWidth: 360, borderRadius: 3, boxShadow: 3 }}
            key={product.id}
          >
            {/* Product Image */}
            <CardMedia
              component="img"
              height="180"
              image={product.thumbnail}
              alt={product.title}
            />

            {/* Product Content */}
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom noWrap>
                {product.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {product.brand} • {product.category}
              </Typography>
              <Box display="flex" alignItems="center" mt={1} mb={1}>
                <Rating
                  value={product.rating}
                  precision={0.5}
                  readOnly
                  size="small"
                />
                <Typography variant="caption" ml={1}>
                  {product.rating.toFixed(1)}
                </Typography>
              </Box>

              {/* Price Section */}
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  ${product.price.toFixed(2)}
                </Typography>
              </Box>

              {/* Stock Info */}
              <Typography
                variant="body2"
                color={product.stock > 0 ? "success.main" : "error.main"}
                gutterBottom
              >
                {product.availabilityStatus}
              </Typography>

              {/* Short Description */}
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {product.description}
              </Typography>
            </CardContent>

            {/* Actions */}
            <CardActions>
              <Button fullWidth variant="contained" color="primary">
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
