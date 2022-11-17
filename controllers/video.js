import User from "../models/user.js";
import Video from "../models/video.js";

export const createVideo = async (req, res) => {
  try {
    const createdVideo = await Video.create({
      ownerId: req.user.id,
      ...req.body,
    });
    const saved = await createdVideo.save();
    res.status(201).json(saved);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

export const searchVideo = async (req, res) => {
  const queryParam = req.body.search;
  try {
    const searchedVideo = await Video.find({
      title: { $regex: queryParam, $options: "i" },
    });
    res.status(200).json(searchedVideo);
  } catch (error) {
    console.log(error.message);
    res.status(400).json("No video");
  }
};

export const editVideo = async (req, res) => {
  try {
    const video = await Video.findOneAndUpdate(
      req.params.Id,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json(video);
  } catch (error) {
    console.log(error.message);
    res.status(400).json("Something went wrong!");
  }
};

export const deleteVideo = async (req, res) => {
  try {
    await Video.findOneAndDelete(req.params.Id);
    res.status(200).json("Video Deleted Successfully!");
  } catch (error) {
    console.log(error.message);
    res.status(400).json("Something went wrong!");
  }
};

export const getVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.Id);
    res.status(200).json(video);
  } catch (error) {
    console.log(error.message);
    res.status(400).json("Something went wrong!");
  }
};

export const increaseViews = async (req, res) => {
  try {
    const video = await Video.findOneAndUpdate(
      { _id: req.params.Id },
      { $inc: { views: 1 } },
      { new: true }
    );
    res.status(200).json(video);
  } catch (error) {
    console.log(error.message);
    res.status(400).json("Something went wrong!");
  }
};

export const increaseTrendingViews = async (req, res) => {
  try {
    const video = await Video.findOneAndUpdate(
      { _id: req.params.Id },
      { $inc: { trending: 1 } },
      { new: true }
    );
    res.status(200).json(video);
  } catch (error) {
    console.log(error.message);
    res.status(400).json("Something went wrong!");
  }
};

export const getRandomVideos = async (req, res) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 50 } }]);
    res.status(200).json(videos);
  } catch (error) {
    console.log(error.message);
    res.status(400).json("Something went wrong!");
  }
};

export const getTrendingVideos = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ trending: -1 });
    res.status(200).json(videos);
  } catch (error) {
    console.log(error.message);
    res.status(400).json("Something went wrong!");
  }
};

export const getSubscribedVideos = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    const subscriptions = currentUser.subscribedChannels;
    const channels = await Promise.all(
      subscriptions.map((channels) => {
        return Video.find({ownerId: channels});
      })
    );
    res.status(200).json(channels.flat());
  } catch (error) {
    console.log(error.message);
    res.status(400).json("Something went wrong!");
  }
};

export const getTagLikeVideos = async (req, res) => {
  const searchedVideo = await Video.findById(req.params.Id);
  try {
    const videos = await Video.find({ tags: { $in: searchedVideo.tags } });
    const videoHolders = []
    videos.forEach(video => videoHolders.push(video.ownerId))
    const owners = await Promise.all(
      videoHolders.map(holders => {
        return User.find({_id: holders})
      })
    )
    res.status(200).json({videos, owners: owners.flat()});
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
};

export const getRecommendedVideos = async (req, res) => {
  try {
    const currUser = await User.findById(req.user.id);
    const videos = await Video.find({
      tags: { $in: currUser.recommendedVideos },
    });
    res.status(200).json(videos);
  } catch (error) {
    console.error(error.message);
    res.status(400).json(error.message);
  }
};

export const likeVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      { _id: req.params.videoId },
      { $addToSet: { likes: req.user.id }, $pull: { dislikes: req.user.id } },
      { new: true }
    );
    res.status(200).json({ video, message: "Video liked!" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
};

export const dislikeVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      { _id: req.params.videoId },
      { $pull: { likes: req.user.id }, $addToSet: { dislikes: req.user.id } },
      { new: true }
    );
    res.status(200).json({ video, message: "Video disliked!" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
};
