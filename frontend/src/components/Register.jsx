import { useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom"
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
import { Visibility, VisibilityOff ,Refresh } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    otp: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isOTPSent, setIsOTPSent] = useState(false);
  const { fullname, username, email, password, confirmpassword, otp } = formData;
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

  const validate = () =>{
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
        const response = await axios.post("http://localhost:3000/api/user/register", {
          fullname,
          username,
          email,
          password,
        });

        setMessage(response.data.message);
        setAlertSeverity("success");
        setOpenSnackbar(true);
        setIsOTPSent(true);
      } catch (error) {
        setMessage(error.response?.data?.message || "Server error");
        setAlertSeverity("error");
        setOpenSnackbar(true);
      }
    }
  };

  const onVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/user/verify-otp", {
        email,
        otp,
      });

      setMessage(response.data.message);
      setAlertSeverity("success");
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Server error");
      setAlertSeverity("error");
      setOpenSnackbar(true);
    }
  };
  const onRegenerateOTP = async (e)=>{
    e.preventDefault();
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/user/regenerate-otp", {
        fullname,email
      });

      setMessage(response.data.message);
      setAlertSeverity("success");
      setOpenSnackbar(true);
      
    } catch (error) {
      setMessage(error.response?.data?.message || "Server error");
      setAlertSeverity("error");
      setOpenSnackbar(true);
    }
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm">
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={alertSeverity}>
          <AlertTitle>{alertSeverity === "error" ? "Error" : "Success"}</AlertTitle>
          {message}
        </Alert>
      </Snackbar>

      <Typography variant="h4" component="h1" gutterBottom>
        Register
      </Typography>
      <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="fullname"
          label="Full Name"
          name="fullname"
          autoComplete="name"
          autoFocus
          value={fullname}
          onChange={onChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          value={username}
          onChange={onChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={email}
          onChange={onChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={onChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmpassword"
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          id="confirmpassword"
          autoComplete="current-password"
          value={confirmpassword}
          onChange={onChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {isOTPSent && (
          <TextField
            margin="normal"
            required
            fullWidth
            name="otp"
            label="OTP"
            type="text"
            id="otp"
            value={otp}
            onChange={onChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="regenerate OTP"
                    onClick={onRegenerateOTP}
                    edge="end"
                  >
                    <Refresh />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}

        {!isOTPSent ? (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        ) : (
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={onVerifyOTP}
            sx={{ mt: 3, mb: 2 }}
          >
            Verify OTP
          </Button>
        )}

        <Grid container justifyContent="flex-end">
          <Grid item>
            <Typography variant="body2">
              Already have an account? <Button component={Link} to="/login">Sign in</Button>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Register;
