import { ListItem, IconButton, ListItemText } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";
function Goal({ goal }) {
  const dispatch = useDispatch();

  const done = () => {
    dispatch(deleteGoal(goal._id));
  };
  return (
    <ListItem alignItems="flex-start" key={goal._id}>
      <IconButton
        sx={{
          color: "#fff",
          border: "1px solid rgba(191, 86, 255, 0.79)",
          width: 30,
          height: 30,
        }}
        aria-label="check"
        onClick={done}
      >
        <CheckIcon sx={{ fontSize: "19px" }} />
      </IconButton>
      <ListItemText primary={goal.text} sx={{ color: "#fff", ml: "0.8rem" }} />
    </ListItem>
  );
}

export default Goal;
