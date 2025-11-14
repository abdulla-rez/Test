import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { createSale, getAllProducts } from "../services/productApi";

const SalesPage = () => {
  const [selectedId, setSelectedId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState<any>([]);
  const [cart, setCart] = useState<any>([]);
  const [showBill, setShowBill] = useState(false);
  const [billData, setBillData] = useState<any>(null);


  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const response = await getAllProducts();
      setProducts(response.data.data);
    } catch (error) {
      console.log("Error in fetching products", error);
    }
  };

  const handleSubmitBill = async () => {
    const payload = cart.map((item: any) => ({
      product_id: item.product_id,
      quantity: item.quantity,
    }));

    try {
      const result = await createSale(payload);
      setBillData(result.data);
      console.log("data from backend",result.data)
      setShowBill(true);
      setCart([])
    } catch (error) {
      console.log("Error in creating bill", error);
    }
  };



  const handleRemoveFromCart = (id:any)=>{
    if(id){
      const removed = cart.filter((cart:any)=>cart.product_id!==id)
      setCart(removed)
    }
  }

  const handleAddItem = () => {
    if (!selectedId) return;

    const product = products.find((p: any) => p.product_id === selectedId);
    if (!product) return;

    const item = {
      product_id: product.product_id,
      name: product.product_name,
      price: product.price || 0,
      quantity,
    };

    setCart((prev: any) => [...prev, item]);
    console.log("Cart",cart)
  };

  return (
    <Box p={3} display="flex" justifyContent="center" flexDirection="column">
      <Card sx={{ width: 380, alignSelf: "center" }}>
        <CardContent>
          <Typography variant="h5" mb={2} textAlign={"center"}>
            Sales
          </Typography>

          <TextField
            select
            fullWidth
            label="Select Product"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            sx={{ mb: 2 }}
          >
            <MenuItem value="">Select…</MenuItem>
            {products.map((p:any) => (
              <MenuItem key={p.product_id} value={p.product_id}>
                {p.product_name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            type="number"
            fullWidth
            label="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            sx={{ mb: 2 }}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            onClick={handleAddItem}
          >
            Add Item
          </Button>
        </CardContent>
      </Card>

      {cart.length > 0 && (
        <Box mt={4} alignSelf="center" width={500}>
          <Typography variant="h6" mb={1}>
            Added Items
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Action</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((item:any, index:any) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.price * item.quantity}</TableCell>
                  <TableCell><Button onClick={()=>handleRemoveFromCart(item.product_id)}>Delete</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Button
            variant="contained"
            sx={{ mt: 3 }}
            fullWidth
            onClick={handleSubmitBill}
          >
            Generate Bill
          </Button>
        </Box>
      )}

      {showBill && (
        <Box mt={4} p={2} borderRadius={2} alignSelf="center" width={500}>
          {billData && (
            <Box
              mt={4}
              p={2}
              border="1px solid #ccc"
              borderRadius={2}
              alignSelf="center"
              width={400}
            >
              <Typography textAlign={"center"} variant="h6" mb={2}>
                Bill Summary
              </Typography>

              <Typography>Bill ID: {billData.bill.bill_id}</Typography>

              <Typography mt={2} fontWeight="bold">
                Items:
              </Typography>

              {billData.bill.saled_product.saleItem.map((item:any,index:number) => (
                <Box key={index} mt={1} p={1} borderRadius={1}>
                  <Typography>
                    {item.product.product_name} × {item.quantity}
                  </Typography>
                  <Typography>Subtotal: ₹{item.subTotal}</Typography>
                </Box>
              ))}

              <Typography mt={2}>
                Final Price: ₹{billData.bill.saled_product.final_price}
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SalesPage;
