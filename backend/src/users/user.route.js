const express = require("express");
const User = require("./user.model");
const genrateToken = require("../middleware/generateToken");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");

const router = express.Router();

/* ======================
   AUTH
====================== */

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ email, username, password });
    await user.save();
    res.status(201).send({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ message: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).send({ message: "Password not match" });

    const token = await genrateToken(user.id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
    });

    res.status(200).send({
      message: "Logged in successfully",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        profileImage: user.profileImage,
        bio: user.bio,
        profession: user.profession,
        address: user.address,
      },
    });
  } catch (error) {
    res.status(500).send({ error: "Login failed" });
  }
});

// LOGOUT
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).send({ message: "Logout successful" });
});

/* ======================
   ADMIN ROUTES
====================== */

// GET ALL USERS (ADMIN)
router.get("/users", verifyToken, verifyAdmin, async (req, res) => {
  const users = await User.find({}, "email role username").sort({
    createdAt: -1,
  });
  res.status(200).send(users);
});

// DELETE USER (ADMIN)
router.delete("/users/:id", verifyToken, verifyAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send({ message: "User deleted" });
});

// UPDATE USER ROLE (ADMIN)
router.put("/users/:id", verifyToken, verifyAdmin, async (req, res) => {
  const { role } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true }
  );

  res.status(200).send({ message: "Role updated", user });
});

/* ======================
   USER PROFILE (STEP 2.3)
====================== */

router.patch("/update-profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).send({ message: "User not found" });

    const { username, bio, profession, address } = req.body;

    if (username !== undefined) user.username = username;
    if (bio !== undefined) user.bio = bio;
    if (profession !== undefined) user.profession = profession;

    if (address !== undefined) {
      user.address = {
        ...user.address,
        ...address,
      };
    }

    await user.save();

    res.status(200).send({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({ message: "Failed to update profile" });
  }
});

module.exports = router;
