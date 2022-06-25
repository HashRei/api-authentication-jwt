const router = require("express").Router();

router.post("/request", (req, res) => {
  res.send("Register");
});

  

module.exports = router;
