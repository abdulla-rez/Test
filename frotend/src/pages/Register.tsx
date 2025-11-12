import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { registerAPI } from "../services/authApi";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTogglePassword = () => {
    console.log("Hii");
    setShowPassword((prev) => !prev);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await registerAPI(formData);
      setFormData({ name: "", email: "", password: "" });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log("Error in registering user", error);
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#f5f6fa"
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            width: "100%",
            maxWidth: 360,
            textAlign: "center",
          }}
        >
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Register to your account
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              size="small"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              size="small"
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      sx={{ fontSize: "15px" }}
                      onClick={handleTogglePassword}
                      edge="end"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                py: 1.2,
                fontWeight: 600,
                textTransform: "none",
                borderRadius: 2,
              }}
            >
              Register
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default Register;
