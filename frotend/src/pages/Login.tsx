import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { loginAPI } from "../services/authApi";
import { useNavigate } from "react-router-dom";


const Login = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await loginAPI(formData)
      console.log("response",response.data.data.user)
      localStorage.setItem("authToken",response.data.data.accessToken)
      let user = JSON.stringify(response.data.data.user);
      localStorage.setItem("userData", user);
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000);
    } catch (error) {
      console.log("Error in login",error)
    }
   
  };

  return (
       <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="97vh"
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
          Login to your account
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
           
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
                  <IconButton sx={{fontSize:"15px"}} onClick={handleTogglePassword} edge="end">
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
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
