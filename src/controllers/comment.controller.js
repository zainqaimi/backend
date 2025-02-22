// import { asyncHandler } from "../utils/asyncHandler";

// const getVideoComments = asyncHandler(async (req, res) => {
//   const { videoId } = req.params;
//   const { page = 1, limit = 10 } = req.query;
// });

// const addComment = asyncHandler(async (req, res) => {
//   // TODO: add a comment to a video
// });

// const updateComment = asyncHandler(async (req, res) => {
//   // TODO: update a comment
// });

// const deleteComment = asyncHandler(async (req, res) => {
//   // TODO: delete a comment
// });

// export { getVideoComments, addComment, updateComment, deleteComment };

import { asyncHandler } from "../utils/asyncHandler";
import { Comment } from "../models/commentModel";

// 1️⃣ Get comments of a video with pagination
const getVideoComments = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const comments = await Comment.find({ video: videoId })
    .populate("owner", "name email") // Populate owner details
    .sort({ createdAt: -1 }) // Latest comments first
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const totalComments = await Comment.countDocuments({ video: videoId });

  res.status(200).json({
    success: true,
    totalPages: Math.ceil(totalComments / limit),
    currentPage: Number(page),
    comments,
  });
});

// 2️⃣ Add a comment
const addComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { videoId } = req.params;
  const userId = req.user.id; // Assuming authentication middleware

  if (!content) {
    return res.status(400).json({ message: "Comment content is required" });
  }

  const comment = await Comment.create({
    content,
    video: videoId,
    owner: userId,
  });

  res.status(201).json({
    success: true,
    message: "Comment added successfully",
    comment,
  });
});

// 3️⃣ Update a comment
const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;
  const userId = req.user.id;

  const comment = await Comment.findById(commentId);
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  if (comment.owner.toString() !== userId) {
    return res
      .status(403)
      .json({ message: "You can only edit your own comments" });
  }

  comment.content = content;
  await comment.save();

  res.status(200).json({
    success: true,
    message: "Comment updated successfully",
    comment,
  });
});

// 4️⃣ Delete a comment
const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user.id;

  const comment = await Comment.findById(commentId);
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  if (comment.owner.toString() !== userId) {
    return res
      .status(403)
      .json({ message: "You can only delete your own comments" });
  }

  await comment.deleteOne();

  res.status(200).json({
    success: true,
    message: "Comment deleted successfully",
  });
});

export { getVideoComments, addComment, updateComment, deleteComment };
