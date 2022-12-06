import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  try {
    if (req.body.repass !== req.body.password) {
      throw new Error("Your passwords must match!");
    }
    const user = new User({ ...req.body, password: hash });
    const savedUser = await user.save();
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_KEY);
    res.cookie("accessToken", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.status(201).json(savedUser);
  } catch (error) {
    if (error.code === 11000) {
      const keyVal = error.keyValue;
      res
        .status(400)
        .json({
          message: `${
            keyVal.hasOwnProperty("email") ? "E-mail" : "Name"
          } is already taken!`,
        });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};

export const logIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error("Your e-mail address is wrong!");

    const isPasswordMatching = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordMatching) throw new Error("Your password is wrong!");

    const { password, ...details } = user._doc;

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
    res.cookie("accessToken", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.status(200).json(details);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.cookie("accessToken", "none", {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });
  res
    .status(200)
    .json({ success: true, message: "User logged out successfully" });
};
