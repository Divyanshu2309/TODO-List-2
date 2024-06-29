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

    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const user = await User.findOne({ email });

    // Compare password with hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            message: "Login successful",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
        });
    } else {
        res.status(401);
        throw new Error("Email or password is not valid");
    }
}


module.exports = { signupUser, loginUser };
