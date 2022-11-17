import User from "../models/user.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
};

export const getUser = async (req, res) => {
  try {
    const currUser = await User.findById(req.params.userId);
    res.status(200).json(currUser);
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
};

export const getMe = async (req, res) => {
  try {
    const me = await User.findById(req.user.id);
    res.status(200).json(me);
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
};

export const updateUser = async (req, res) => {
  if (req.user.id !== req.params.userId)
    return res.status(403).json("You cannot update other people profiles");
  try {
    const currUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { ...req.body },
      { new: true }
    );
    res.status(201).json(currUser);
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
};

export const deleteUser = async (req, res) => {
  if (req.user.id !== req.params.userId)
    return res.status(403).json("You cannot update other people profiles");
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User deleted successfully!");
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
};

export const subscribeToChannel = async (req, res) => {
  if (req.user.id === req.params.userId)
    return res.status(400).json("You are not allowed to subscribe to yourself");
  try {
    const channel = await User.findById(req.params.userId);
    if (!channel) return res.status(400).json("Channel does not exist");
    const currUser = await User.findByIdAndUpdate(
      { _id: req.user.id },
      { $addToSet: { subscribedChannels: channel._id } },
      { new: true }
    );
    res.status(200).json(currUser);
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
};

export const incrementSubscribersCount = async (req, res) => {
  if (req.user.id === req.params.userId)
    return res.status(400).json("You are not allowed to subscribe to yourself");
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $inc: { subscribers: 1 } },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
};

export const unSubscribeToChannel = async (req, res) => {
  if (req.user.id === req.params.userId)
    return res.status(400).json("You are not allowed to subscribe to yourself");
  try {
    const channel = await User.findById(req.params.userId);
    if (!channel) return res.status(400).json("Channel does not exist");
    const currUser = await User.findByIdAndUpdate(
      { _id: req.user.id },
      { $pull: { subscribedChannels: channel._id } },
      { new: true }
    );
    res.status(200).json(currUser);
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
};

export const decrementSubscribersCount = async (req, res) => {
  if (req.user.id === req.params.userId)
    return res.status(400).json("You are not allowed to subscribe to yourself");
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $inc: { subscribers: -1 } },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
};

export const recommendVideos = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    req.body.tags.forEach((tag) => {
      if (!user.recommendedVideos.includes(tag)) {
        user.recommendedVideos.push(tag)
      }
    });
    user.markModified('recommendedVideos')
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
};