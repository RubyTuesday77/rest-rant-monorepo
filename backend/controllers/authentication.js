// Create authentication controller to handle user logins
const router = require("express").Router();
const db = require("../models");
const bcrypt = require("bcrypt");

const { User } = db;

router.post("/", async (req, res) => {
  // Compare user credentials to data in database when login form submitted
  let user = await User.findOne({
    where: { email: req.body.email },
  });
  // console.log(user);

  // Compare password from the frontend login with the passwordDigest stored in our backend database
  if (
    !user ||
    !(await bcrypt.compare(req.body.password, user.passwordDigest))
  ) {
    res.status(404).json({
      message: `Could not find a user with the provided username and password`,
    });
  } else {
    res.json({ user });
  }
});

module.exports = router;
