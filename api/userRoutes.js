const router = require("express").Router();
const User = require("../models/User");

// GET all users
router.get("/", async (req, res) => {
    console.log('User');
    
  try {
    const users = await User.find().populate("thoughts").populate("friends");
    res.json(users);
  } catch (err) {
    console.log({err});
    
    res.status(500).json(err);
  }
});

// GET a single user by _id
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate("thoughts")
      .populate("friends");
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new user
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT to update a user by _id
router.put("/:userId", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a user by _id
router.delete("/:userId", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST to add a friend
router.post("/:userId/friends/:friendId", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $push: { friends: req.params.friendId } },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE to remove a friend
router.delete("/:userId/friends/:friendId", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
