import React, { useEffect, useState } from "react";

import {
  Container,
  Paper,
  InputBase,
  Divider,
  IconButton,
  Box,
  List,
  Typography,
  Button,
} from "@mui/material";
import SouthIcon from "@mui/icons-material/South";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addGoal, resetErrors, getGoals } from "../features/goals/goalSlice";

import Goal from "../components/Goal";
import Spinner from "../components/Spinner";

import { toast } from "react-toastify";

function Home() {
  // State
  const [text, setText] = useState("");
  const handleChange = (e) => {
    setText(e.target.value);
  };

  // Redux State
  const { user } = useSelector((store) => store.auth);

  const { goals, isLoading, isSuccess, isError, message } = useSelector(
    (store) => store.goal
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let goalsI = goals;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Goal added successfully!");
    }

    if (isError) {
      toast.error(`Plese provide your goal's text.`);
    }

    dispatch(resetErrors());
  }, [isError, isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getGoals());
  }, [user, navigate, isError]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text.replace(/\s/g, "").length) {
      toast.error(`Plese provide your goal's text.`);
      return;
    }

    dispatch(addGoal({ text }));
    setText("");
  };
  // If goals is undefined, then set it to []
  if (!goals) {
    goalsI = [];
  }

  const mappedGoals = goalsI.map((goal) => {
    if (goalsI.length === goalsI.indexOf(goal) + 1) {
      return (
        <div key={goal._id}>
          <Goal goal={goal} />
        </div>
      );
    } else {
      return (
        <div key={goal._id}>
          <Goal goal={goal} />
          <Divider
            sx={{
              border: "1px solid rgba(72, 64, 64, 0.37)",
              margin: "0 46px",
            }}
            variant="inset"
            component="li"
          />
        </div>
      );
    }
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (user) {
    return (
      <Container className="container">
        <Paper
          className="add"
          component="form"
          sx={{ display: "flex", alignItems: "center", width: 400 }}
        >
          <InputBase
            className="input"
            sx={{ ml: 1, flex: 1, color: "#FFFFFF", pl: 1 }}
            placeholder="Create a new todo..."
            name="text"
            value={text}
            onChange={handleChange}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            color="primary"
            sx={{
              p: "10px",
              color: "#fff",
              backgroundColor: "rgba(90, 255, 49, 0.6)",
              borderRadius: "0 30px 30px 0",
            }}
            aria-label="directions"
            type="submit"
            onClick={onSubmit}
          >
            <SouthIcon />
          </IconButton>
        </Paper>

        {goalsI.length ? (
          <Paper
            sx={{
              width: 400,
              mt: "2em",
              borderRadius: 0,
              backgroundColor: "#25273C",
            }}
          >
            <Box sx={{ backgroundColor: "#25273C" }}>
              <List sx={{ width: "100%" }}>{mappedGoals}</List>
            </Box>
            <Box
              sx={{
                border: "1px solid #AD02FE",
                alignItems: "center",
                padding: 1,
                display: "flex",
                color: "#fff",
              }}
            >
              <Typography variant="subtitle2" component="p">
                {goals.length} Item{goals.length !== 1 && "s"}
              </Typography>
              <Button variant="text" sx={{ ml: "auto", color: "#fff" }}>
                Clear Complete
              </Button>
            </Box>
          </Paper>
        ) : (
          <Typography
            variant="h4"
            sx={{ color: "#fff", mt: 4, textAlign: "center" }}
          >
            You don't have any goals yet. <br />
            Create one and start planning your daily routines!
          </Typography>
        )}
      </Container>
    );
  }
}

export default Home;
