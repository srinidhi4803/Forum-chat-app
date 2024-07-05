// src/Register.js
import { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
  AlertTitle,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { fullname, username, email, password, confirmpassword } = formData;
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const fullnameRegex = /^[A-Za-z\s]{2,}$/;
    if (!fullnameRegex.test(fullname)) {
      setMessage("Invalid full name");
      setAlertSeverity("error");
      setOpenSnackbar(true);
      return false;
    }
    const usernameRegex = /^(?=.*[A-Za-z])[A-Za-z0-9_]{3,20}$/;
    if (!usernameRegex.test(username)) {
      setMessage("Invalid username");
      setAlertSeverity("error");
      setOpenSnackbar(true);
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Invalid email");
      setAlertSeverity("error");
      setOpenSnackbar(true);
      return false;
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/;
    if (!passwordRegex.test(password)) {
      setMessage("Password must contain lowercase, uppercase, digit, symbol");
      setAlertSeverity("error");
      setOpenSnackbar(true);
      return false;
    }
    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
      setAlertSeverity("error");
      setOpenSnackbar(true);
      return false;
    }

    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/user/register",
          {
            fullname,
            username,
            email,
            password,
            confirmpassword,
          }
        );

        setMessage(response.data.message);
        setAlertSeverity("success");
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } catch (error) {
        setMessage(error.response?.data?.message || "Server error");
        setAlertSeverity("error");
        setOpenSnackbar(true);
      } finally {
        setTimeout(() => {
          setFormData({
            fullname: "",
            username: "",
            email: "",
            password: "",
            confirmpassword: "",
          });
          setMessage("");
        }, 2000);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm">
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={alertSeverity} sx={{ width: '100%' }}>
          <AlertTitle>{alertSeverity === "error" ? "Error" : "Success"}</AlertTitle>
          {message}
        </Alert>
      </Snackbar>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h4" component="h2" gutterBottom>
          Register
        </Typography>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                name="fullname"
                value={fullname}
                onChange={onChange}
                placeholder="Enter your full name"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={username}
                onChange={onChange}
                placeholder="Enter your username"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Enter your email"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Enter your password"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmpassword"
                value={confirmpassword}
                onChange={onChange}
                placeholder="Re-enter your password"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
