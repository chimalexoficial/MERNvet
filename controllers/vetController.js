import Vet from "../models/Vet.js";
import generateJWT from "../helpers/generateJWT.js";
import generateID from "../helpers/generateID.js";

const register = async (req, res) => {
    const { email } = req.body;

    // Is user (email) already in use?
    const userInUse = await Vet.findOne({ email });
    if (userInUse) {
        const error = new Error('Email already in use');
        return res.status(400).json({ msg: error.message });
    }

    try {
        const vet = new Vet(req.body);
        const vetSaved = await vet.save();
        res.json(vetSaved);

    } catch (error) {

    }
};

const profile = (req, res) => {
    console.log(req.vet);
    const { vet } = req;
    res.json({ vet })
}

const confirm = async (req, res) => {
    const { token } = req.params;

    const userToConfirm = await Vet.findOne({ token: token })

    if (!userToConfirm) {
        const error = new Error('Token is invalid');
        return res.status(404).json({ msg: error.message })
    }

    try {
        userToConfirm.token = null;
        userToConfirm.confirmed = true;
        await userToConfirm.save();
        res.json({ "msg": "User confirm correctly. Token removed." })
    } catch (error) {
        console.log(error);
    }
}

const auth = async (req, res) => {
    const { email, password } = req.body;
    // user is already registered?
    const user = await Vet.findOne({ email });
    if (!user) {
        const error = new Error('User not found');
        return res.status(404).json({ msg: error.message });
    }

    // user is confirmed?
    if (!user.confirmed) {
        const error = new Error('Your account has not been confirmed yet');
        return res.status(404).json({ msg: error.message });
    }

    // check password
    if (await user.checkPassword(password)) {
        console.log(user);
        res.json({ token: generateJWT(user.id) });
        console.log('Success. Logged!');
    } else {
        const error = new Error('Incorrect password.');
        return res.status(403).json({ msg: error.message });
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const existVet = await Vet.findOne({ email });
    if (!existVet) {
        const error = new Error('The user does not exist');
        return res.status(400).json(error.message);
    }

    try {
        existVet.token = generateID();
        await existVet.save();
        res.json({ "msg": "Instructions to reset password sent" })
    } catch (error) {
        console.log(error);
    }
}

const verifyToken = async (req, res) => {
    const { token } = req.params;
    const validToken = await Vet.findOne({ token });
    if (validToken) {
        console.log('Token found');
    } else {
        const error = new Error('Invalid token');
        return res.status(400).json({ "msg": error.message });
    }
}

const newPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const vetToken = await Vet.findOne({ token });
    if (!vetToken) {
        const error = new Error('There was an error');
        return res.status(400).json({ "msg": error.message });
    }
    
    try {
        vetToken.token = null;
        vetToken.password = password;
        await vetToken.save();
        res.json({"msg":'Password changed'})
    } catch (error) {
        console.log(error);
    }
}

export {
    register,
    profile,
    confirm,
    auth,
    forgotPassword,
    verifyToken,
    newPassword
}