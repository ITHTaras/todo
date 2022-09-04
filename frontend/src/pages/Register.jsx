import { useState, useEffect } from "react";
import { Container, Typography, TextField, Box, Button } from "@mui/material";
import RegisterIcon from "@mui/icons-material/Person";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import "../Login.css";

import { reset, register } from "../features/auth/authSlice";

import Spinner from "../components/Spinner";

//
function Register() {
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (store) => store.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (user || isSuccess) {
      navigate("/");
    }

    reset();
  }, [user, isError, isSuccess, isLoading, message, navigate, dispatch]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container className="container">
      <Typography className="login" variant="h2" component="h1">
        <RegisterIcon sx={{ fontSize: 60, mr: 1 }} />
        Register
      </Typography>
      <Typography className="login-text" variant="h4" component="h2">
        Register and start planning your daily routine!
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          sx={{
            color: "#fff",
            minWidth: { xs: "100%", sm: "100%", md: "70%" },
            maxHeight: 45,
            mt: "5rem",
            caretColor: "#fff",
          }}
          value={name}
          name="name"
          onChange={onChange}
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          sx={{
            color: "#fff",
            minWidth: { xs: "100%", sm: "100%", md: "70%" },
            maxHeight: 45,
            mt: "60px",
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
        <TextField
          id="outlined-basic"
          label="Confirm Password"
          type="password"
          variant="outlined"
          sx={{
            color: "#fff",
            minWidth: { xs: "100%", sm: "100%", md: "70%" },
            maxHeight: 45,
            mt: "60px",
            caretColor: "#fff",
          }}
          value={password2}
          name="password2"
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

export default Register;
