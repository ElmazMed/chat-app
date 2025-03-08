import cloudinary from "../lib/cloudinary.js";
import Message from "../models/messages.model.js";
import User from "../models/user.schema.js";

const showUsers = async (req, res) => {
  try {
    const loggedUser = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedUser } }).select(
      "-password"
    );
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log(`Error in Show user controller ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log(`Error in get messages controller ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

const sendMessages = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    const { text, image } = req.body;

    let imageUrl;

    if (image) {
      const uploadedImage = await cloudinary.uploader.upload(image);
      imageUrl = uploadedImage;
    }
    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    res.status(201).json(newMessage);
  } catch (error) {
    console.log(`Error in send messages controller ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

export { showUsers, getMessages, sendMessages };
