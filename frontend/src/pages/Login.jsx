import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Box, Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

import "../Login.css";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";

function Login() {
  const { user, isLoading, isError, message, isSuccess } = useSelector(
    (store) => store.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      navigate("/");
    }

    reset();
  }, [user, isLoading, isError, message, isSuccess, dispatch, navigate]);

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container className="container">
      <Typography className="login" variant="h2" component="h1">
        <LoginIcon sx={{ fontSize: 60, mr: 1 }} />
        Login
      </Typography>
      <Typography className="login-text" variant="h3" component="h2">
        Login and start setting goals
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          sx={{
            color: "#fff",
            minWidth: { xs: "100%", sm: "100%", md: "70%" },
            maxHeight: 45,
            mt: "5rem",
            caretColor: "#fff",
          }}
          value={email}
          name="email"
          onChange={onChange}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          type="password"
          variant="outlined"
          sx={{
            color: "#fff",
            minWidth: { xs: "100%", sm: "100%", md: "70%" },
            maxHeight: 45,
            mt: "60px",
            caretColor: "#fff",
          }}
          value={password}
          name="password"
          onChange={onChange}
        />
        <Button
          type="submit"
          variant="outlined"
          onClick={onSubmit}
          sx={{ mt: "2em" }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
}

export default Login;
