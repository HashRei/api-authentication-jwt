const router = require("express").Router();
const verify = require("../routes/verifyToken");

router.get("/", verify, (req, res) => { // Verify is a middleware
  res.send(req.user);
});

module.exports = router;
