import { useEffect, type ChangeEvent } from "react";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setSelectedCategory } from "../redux/productSlice";

import {
  Box,
  CircularProgress,
  Divider,
  Drawer,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  Typography,
} from "@mui/material";
import { fetchCategoryLists } from "../redux/productAction";

export default function Sidebar() {
  const { selectedCategory, categoryLists, loading } = useAppSelector(
    (state) => state.product
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategoryLists());
  }, [dispatch]);

  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch(setSelectedCategory(value));
  };

  return (
    <Drawer
      sx={{
        width: 300,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 300,
          boxSizing: "border-box",
          overflowX: "hidden",
          padding: 2,
        },
      }}
      variant="persistent"
      anchor="left"
      open={true}
    >
      <Box p={2}>
        <Typography variant="h6" gutterBottom>
          Filters
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Category Filter */}
        <Typography variant="body1">Category</Typography>
        <List>
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

          {categoryLists.map((category) => (
            <ListItem key={category}>
              <FormControlLabel
                control={
                  <Radio
                    value={category}
                    checked={selectedCategory === category}
                    onChange={handleCategoryChange}
                  />
                }
                label={category.toUpperCase()}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
