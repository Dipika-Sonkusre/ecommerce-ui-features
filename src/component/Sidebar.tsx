import {
  Box,
  Checkbox,
  Divider,
  Drawer,
  FormControlLabel,
  List,
  ListItem,
  Slider,
  Typography,
} from "@mui/material";
import { useState, type ChangeEvent } from "react";

const categories = [
  {
    id: "beauty",
    label: "Beauty",
  },
  {
    id: "fragrances",
    label: "Fragrances",
  },
  {
    id: "furniture",
    label: "Furniture",
  },
  {
    id: "groceries",
    label: "Groceries",
  },
];

export default function Sidebar() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [rating, setRating] = useState<[number, number]>([0, 5]);

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setPriceRange(newValue as [number, number]);
    }
  };

  const handleRatingChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setRating(newValue as [number, number]);
    }
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <Drawer
      sx={{
        width: 250,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 250,
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

        {/* Price Filter */}
        <Typography variant="body1">Price</Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `₹${value}`}
          min={0}
          max={1000}
        />

        <Divider sx={{ my: 2 }} />

        {/* Category Filter */}
        <Typography variant="body1">Category</Typography>
        <List>
          {categories.map((category) => (
            <ListItem key={category.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedCategory.includes(category.id)}
                    onChange={handleCategoryChange}
                    value={category}
                  />
                }
                label={category.label}
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 1 }} />

        {/* Rating Filter */}
        <Typography variant="body1">Rating</Typography>
        <Slider
          value={rating}
          onChange={handleRatingChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value} Stars`}
          min={0}
          max={5}
          step={0.5}
        />
      </Box>
    </Drawer>
  );
}
