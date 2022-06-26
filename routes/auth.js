const router = require("express").Router();
const User = require("../models/User");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");

router.post("/request", async (req, res) => {
  // Validate the data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if the user is already is in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  // Password hash
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(req.body.password, salt);

  // Create a new user
  const post = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedpassword,
  });

  try {
    await post.save(); // Save the entered post to the database
    res.json({ user: post._id});
  } catch (error) {
    res.json({ message: error });
  }
});

// Login
router.post("/login", async (req, res) =>{
    // Validate the data
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

     // Check if the email is already is in the database
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Ivalid email");

    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send("Invalid password")

    return res.json("Loged in")

})

module.exports = router;
