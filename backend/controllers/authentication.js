// Create authentication controller to handle user logins
const router = require("express").Router();
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require('json-web-token');  // Require json-web-token npm package

const { User } = db;

router.post("/", async (req, res) => {
    // Compare user credentials to data in database when login form submitted
    let user = await User.findOne({
        where: { email: req.body.email },
    });
    // console.log(user);

    // Compare password from the frontend login with the passwordDigest stored in our backend database
    if(!user || !await bcrypt.compare(req.body.password, user.passwordDigest)) {
        res.status(404).json({
            message: `Could not find a user with the provided username and password`,
        });
    } else {
        // Create a JWT if login is successful
        const result = await jwt.encode(process.env.JWT_SECRET, { id: user.userId })
        res.json({ user: user, token: result.value });
    }
});

// Add route handler to handle logged in user:
router.get('/profile', async (req, res) => {
    try {
        // Split authorization header into ["Bearer", "TOKEN"]:
        const [authenticationMethod, token] = req.headers.authorization.split(' ')

        // Only handle "Bearer" authorization for now (can add other authorization strategies later):
        if(authenticationMethod === 'Bearer') {

            // Decode the JWT:
            const result = await jwt.decode(process.env.JWT_SECRET, token)

            // Get logged in user's id from the payload:
            const { id } = result.value

            // Find the user object using their id:
            let user = await User.findOne({
                where: {
                    userId: id
                }
            })
            res.json(user)
        }
    } catch {
        res.json(null)
    }
})

module.exports = router;
