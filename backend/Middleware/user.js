const { User } = require("../db");

async function usermiddleware(req, res, next) {
    const { username, password } = req.headers;

    try {
        const user = await User.findOne({ username, password });

        if (user) {
            req.user = user;
            next();
        } else {
            res.status(404).json({ msg: "User does not exist" });
        }
    } catch (err) {
        console.error("Error in usermiddleware:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
}

module.exports = usermiddleware;
