import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchProducts } from "../redux/productAction";
import { setLimit, setOrder, setSkip, setSortBy } from "../redux/productSlice";
import type { ProductType } from "../interface";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
  CircularProgress,
  Typography,
  TableSortLabel,
} from "@mui/material";

const tableColumns = [
  "id",
  "title",
  "brand",
  "category",
  "price",
  "rating",
  "stock",
];

export default function ProductSorting() {
  const dispatch = useAppDispatch();
  const { products, loading, error, skip, limit, total, sortBy, order } =
    useAppSelector((state) => state.product);

  // Fetch products
  useEffect(() => {
    if (sortBy && order) {
      dispatch(fetchProducts({ skip, limit, sortBy, order }));
    } else {
      dispatch(fetchProducts({ skip, limit }));
    }
  }, [dispatch, skip, limit, sortBy, order]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    const newSkip = newPage * limit;
    dispatch(setSkip(newSkip));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newLimit = parseInt(event.target.value, 10);
    dispatch(setLimit(newLimit));
    dispatch(setSkip(0));
  };

  const handleSort = (column: string) => {
    if (column === null) return;

    const isAsc = sortBy === column && order === "asc";
    dispatch(setSortBy(column));
    dispatch(setOrder(isAsc ? "desc" : "asc"));
  };

  const rowsPerPageOptions = Array.from(
    { length: Math.ceil(total / limit) },
    (_, i) => (i + 1) * limit
  );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ position: "relative", minHeight: 200 }}>
        {/* Loader centered over entire table area */}
        {loading && (
          <Box
            sx={{
              position: "absolute",
              inset: 0, // top:0, right:0, bottom:0, left:0
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(255,255,255,0.5)", // optional dim overlay
              zIndex: 2,
            }}
          >
            <CircularProgress />
          </Box>
        )}

        <Table stickyHeader>
          {error && (
            <Typography
              variant="body1"
              color="error"
              gutterBottom
              sx={{ textAlign: "center", p: 2 }}
            >
              {error}
            </Typography>
          )}

          {products?.length === 0 && !loading && (
            <Typography
              variant="body1"
              gutterBottom
              sx={{ textAlign: "center", p: 2 }}
            >
              No products found.
            </Typography>
          )}
          <TableHead>
            <TableRow>
              {tableColumns.map((column) => (
                <TableCell
                  key={column}
                  sx={{
                    fontWeight: "bold",
                    fontSize: "inherit",
                    textTransform: "uppercase",
                    padding: "10px",
                  }}
                  sortDirection={sortBy === column ? order : false}
                  onClick={() => handleSort(column)}
                >
                  <TableSortLabel
                    active={sortBy === column}
                    direction={sortBy === column ? order : "asc"}
                    onClick={() => column && handleSort(column)}
                  >
                    {column.toUpperCase()}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((product: ProductType) => (
              <TableRow hover key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.rating}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={total}
        rowsPerPage={limit}
        page={Math.floor(skip / limit)}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
