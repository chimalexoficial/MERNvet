import Vet from "../models/Vet.js";
import generateJWT from "../helpers/generateJWT.js";

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

const forgotPassword = (req, res) => {
    
}

export {
    register,
    profile,
    confirm,
    auth,
    forgotPassword,

}