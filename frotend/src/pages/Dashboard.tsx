import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
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
  addStock,
  createProduct,
  deleteproduct,
  fetchAllPurchasedBill,
  getAllProducts,
  updateProduct,
} from "../services/productApi";

const Dashboard = () => {
  const [products, setpProducts] = useState<any>();
  const [open, setOpen] = React.useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const [formdata, setFormData] = useState({
    product_name: "",
    price: null,
    currentStock: null,
    taxPercentage: null,
  });

  const [quantity, setQuantity] = useState(0);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (e: any) => {
    setQuantity(Number(e.target.value));
  };

  useEffect(() => {
    fetchAllProducts();
    fetchAllPurchasedBills();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const response = await getAllProducts();
      setpProducts(response.data.data);
    } catch (error) {
      console.log("Error in fetching products", error);
    }
  };

  const fetchAllPurchasedBills = async () => {
    try {
      const response = await fetchAllPurchasedBill();
      console.log("Bill response", response);
    } catch (error) {
      console.log("Error in ");
    }
  };

  const handleClickOpen = () => {
    setEditingId(null);
    setSelectedProduct(null);
    setFormData({
      product_name: "",
      price: null,
      currentStock: null,
      taxPercentage: null,
    });
    setOpen(true);
  };

  const handleAddOpen = (product: any) => {
    setSelectedProduct(product);
    setAddOpen(true);
  };

  const handleAddClose = () => {
    setAddOpen(false);
    setQuantity(0);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setSelectedProduct(null);
    setFormData({
      product_name: "",
      price: null,
      currentStock: null,
      taxPercentage: null,
    });
  };

  const handleEdit = (product:any) => {
    setEditingId(product.product_id);
    setSelectedProduct(product);

    setFormData({
      product_name: product.product_name,
      price: product.price,
      currentStock: product.currentStock,
      taxPercentage: product.taxPercentage,
    });

    setOpen(true);
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateProduct(editingId, formdata);
      } else {
        await createProduct(formdata);
      }

      handleClose();
      fetchAllProducts();
    } catch (error) {
      console.log("Error in create/update", error);
    }
  };

  const handleDelete = async (deleteId: any) => {
    try {
      await deleteproduct(Number(deleteId));
      fetchAllProducts();
    } catch (error) {
      console.log("Error in deletind product");
    }
  };

  const handleSubmitAddStock = async (e: any) => {
    e.preventDefault();
    const payload = { prouct_id: selectedProduct?.product, quantity: quantity };
    try {
      await addStock(payload);
      setQuantity(0);
      setAddOpen(false);
      fetchAllProducts();
    } catch (error) {
      console.log("error");
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
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Product ID </TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Product Price</TableCell>
              <TableCell>Current Stock</TableCell>
              <TableCell>Tax %</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell colSpan={3} style={{ textAlign: "center" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products?.map((product: any) => (
              <TableRow key={product.product_id}>
                <TableCell>{product.product_id}</TableCell>
                <TableCell>{product.product_name}</TableCell>
                <TableCell>₹ {product.price}</TableCell>
                <TableCell>{product.currentStock}</TableCell>
                <TableCell>{product.taxPercentage}</TableCell>
                <TableCell>{product.SKU}</TableCell>

                <TableCell>
                  <Button onClick={() => handleAddOpen(product)}>
                    Add Stock
                  </Button>
                </TableCell>

                <TableCell>
                  <Button onClick={() => handleDelete(product.product_id)}>
                    Delete
                  </Button>
                </TableCell>

                <TableCell>
                  <Button onClick={() => handleEdit(product)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
        <DialogTitle>
          {editingId ? "Update Product" : "Create Product"}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="create-form">
            <TextField
              fullWidth
              required
              label="Product Name"
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
          <Button type="submit" form="create-form">
            {editingId ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog fullWidth maxWidth="sm" open={addOpen} onClose={handleAddClose}>
        <DialogTitle>Add Stock</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmitAddStock} id="add-stock-form">
            <TextField
              fullWidth
              required
              label="Quantity"
              name="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              margin="normal"
              variant="outlined"
              size="small"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose}>Cancel</Button>
          <Button type="submit" form="add-stock-form">
            Add Stock
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
