const router = require("express").Router();
const User = require("../models/User");
const { registerValidation } = require("../validation");


router.post("/request", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const post = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const savedPost = await post.save(); // Save the entered post to the database
    res.json(savedPost);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
