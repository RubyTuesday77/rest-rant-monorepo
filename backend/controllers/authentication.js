// Create authentication controller to handle user logins
const router = require("express").Router();
const db = require("../models");
const bcrypt = require("bcrypt");

const { User } = db;

router.post("/", async (req, res) => {
    // Compare user credentials to data in database when login form submitted
    let user = await User.findOne({
        where: { email: req.body.email }
    });
    // console.log(user);

    // Compare password from the frontend login with the passwordDigest stored in our backend database
    if(!user || !await bcrypt.compare(req.body.password, user.passwordDigest)) {
        res.status(404).json({
            message: `Could not find a user with the provided username and password`
        });
    } else {
        req.session.userId = user.userId
        res.json({ user });
    }
});


// Add GET route handler to respond to the HTTP method and path from the fetch request for getLoggedInUser:
router.get("/profile", async (req, res) => {
    console.log(req.session.userId)
    try {
        let user = await User.findOne({
            where: {
                userId: req.session.userId
            }
        })
        res.json(user)
    } catch {
        res.json(null)
    }
})


module.exports = router;
