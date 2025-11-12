import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  createProduct,
  deleteproduct,
  getAllProducts,
} from "../services/productApi";

const Dashboard = () => {
  const [products, setpProducts] = useState();
  const [deleteId, setDeleteId] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [formdata, setFormData] = useState({
    product_name: "",
    price: null,
    currentStock: null,
    taxPercentage: null,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(formdata);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const response = await getAllProducts();
      console.log(response.data.data);
      setpProducts(response.data.data);
    } catch (error) {
      console.log("Error in fetching products", error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      product_name: "",
      price: null,
      currentStock: null,
      taxPercentage: null,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await createProduct(formdata);
      console.log(formdata);
      console.log("Response", response);
      setFormData({
        product_name: "",
        price: null,
        currentStock: null,
        taxPercentage: null,
      });
      handleClose()

      await fetchAllProducts();
    } catch (error) {
      console.log("Error in creating product");
    }
  };

  const handleDelete = async (deleteId: number) => {
    try {
      console.log(deleteId)
      await deleteproduct(deleteId);
      fetchAllProducts();
    } catch (error) {
      console.log("Error in deletind product");
    }
  };

  return (
    <Box minHeight="97vh" bgcolor="#f5f6fa">
      <Box display="flex" pt={10} justifyContent="center" mb={10}>
        <Typography variant="h4">All Products</Typography>
      </Box>

      <Box textAlign={"right"} mb={2}>
        <Button onClick={handleClickOpen}>Create product</Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Product ID </TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Current Stock</TableCell>
              <TableCell>Tax %</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell sx={{ textAlign: "center" }} colSpan={2}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((product: any) => (
              <TableRow
                key={product.product_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product.product_id}
                </TableCell>
                <TableCell>{product.product_name}</TableCell>
                <TableCell>{product.currentStock}</TableCell>
                <TableCell>{product.taxPercentage}</TableCell>
                <TableCell>{product.SKU}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      handleDelete(product.product_id);
                      setDeleteId(product.product_id);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
                <TableCell>
                  <Button>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog fullWidth={true} maxWidth="sm" open={open} onClose={handleClose}>
        <DialogTitle>Create product</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              fullWidth
              required
              label="PRoduct Name"
              name="product_name"
              value={formdata.product_name}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              size="small"
            />
            <TextField
              fullWidth
              required
              type="number"
              label="Product Price"
              name="price"
              value={formdata.price}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              size="small"
            />
            <TextField
              fullWidth
              required
              label="Current Stock"
              name="currentStock"
              value={formdata.currentStock}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              size="small"
            />
            <TextField
              fullWidth
              required
              label="Tax %"
              name="taxPercentage"
              value={formdata.taxPercentage}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              size="small"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Create Product
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
