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

export default function Sidebar() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedSize, setSelectedSize] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
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

  const handleSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedSize((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleGenderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedGender((prev) =>
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

        {/* Size Filter */}
        <Typography variant="body1">Size</Typography>
        <List>
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <ListItem key={size}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedSize.includes(size)}
                    onChange={handleSizeChange}
                    value={size}
                  />
                }
                label={size}
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 1 }} />

        {/* Category Filter */}
        <Typography variant="body1">Category</Typography>
        <List>
          {["Men", "Women", "Kids"].map((category) => (
            <ListItem key={category}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedCategory.includes(category)}
                    onChange={handleCategoryChange}
                    value={category}
                  />
                }
                label={category}
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 1 }} />

        {/* Gender Filter */}
        <Typography variant="body1">Gender</Typography>
        <List>
          {["Male", "Female", "Unisex"].map((gender) => (
            <ListItem key={gender}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedGender.includes(gender)}
                    onChange={handleGenderChange}
                    value={gender}
                  />
                }
                label={gender}
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
