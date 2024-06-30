const bcrypt = require("bcrypt");
const User = require("../../backend/model/userModel");


//@description  Register a USER
//@route POST api/user/signup
//@access public
const signupUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered!");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    console.log(`User created ${user}`);
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
}

//@description  Login a USER
//@route POST api/user/login
//@access public

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Check if all fields are provided
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are mandatory!" });
    }

    try {
        const user = await User.findOne({ email });

        // Compare password with hashed password
        if (user && (await bcrypt.compare(password, user.password))) {
            return res.status(200).json({
                message: "Login successful",
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                },
            });
        } else {
            return res.status(401).json({ message: "Email or password is not valid" });
        }
    } catch (error) {
        return res.status(500).json({ message: "An error occurred. Please try again." });
    }
};

module.exports = { signupUser, loginUser };
