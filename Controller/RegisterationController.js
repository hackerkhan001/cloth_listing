const User = require('../Model/Registerationmodel');
const bcrypt = require('bcrypt');
const { generateSessionToken } = require('../utlisFunction/sessionProvider');
async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;
        console.log(req.body);
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            username,
            email,
            password:hashedPassword,
        });
        if(newUser){
            const sessionToken = generateSessionToken(newUser);
            res.status(201).json({ user: newUser, msg: 'user created successfully',  token:sessionToken});
        }

    } catch (error) {
        console.log('Error register User:', error);
        return res.status(400).json({ error })
    }
}

module.exports = { registerUser };