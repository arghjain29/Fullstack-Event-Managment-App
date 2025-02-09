import userModel from "../models/user.model.js";
import { validationResult } from "express-validator";


export const createUserController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            throw new Error('Username, Email and password are required');
        }
        const userExists = await userModel.findOne({ email });
        if(userExists) {
            return res.status(400).json({ message: "User already exists" });
        };
        const hashPassword = await userModel.hashPassword(password);
        const user = (await userModel.create({ username, email, password: hashPassword }));
        const token = await user.generateJWT();

        delete user._doc.password;
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginUserController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new Error('Email and password are required');
        }
        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = await user.generateJWT();

        delete user._doc.password;
        res.status(201).json({ user, token });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }


}  
