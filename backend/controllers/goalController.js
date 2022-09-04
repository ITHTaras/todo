const asyncHandler = require("express-async-handler");
const Goal = require("../models/Goal");
const User = require("../models/User");

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json(goals);
});

const addGoal = asyncHandler(async (req, res) => {
  console.log("You called me");
  if (!req.body.text) {
    res.status(400).json({
      message: "Please fill a text field",
    });
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
    done: false,
  });

  res.status(200).json(goal);
});

const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  console.log(goal);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Check if user id matches user id from goal
  if (req.user.id !== goal.user.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal that you wanna delete not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Check if user id matches user id from goal
  if (req.user.id !== goal.user.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await goal.remove();

  res.status(200).json(goal);
});

module.exports = {
  getGoals,
  addGoal,
  updateGoal,
  deleteGoal,
};
