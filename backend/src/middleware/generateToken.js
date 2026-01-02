const jwt = require('jsonwebtoken');
const User = require('../users/user.model')

const JWT_SECRET = process.env.JWT_SECRET_KEY;

const genrateToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found")
        }
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "7d" }
        );


        return token;
    } catch (error) {

    }
}

module.exports = genrateToken;