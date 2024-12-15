const { Router } = require("express");
const {
  getCommentByProdcutId,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/comment.controller");
const { decode } = require("../middleware/decodeJwt");

const commentRouter = Router();

commentRouter.get("/:productId", getCommentByProdcutId);
commentRouter.post("/", decode, createComment);
commentRouter.patch("/:commentId", decode, updateComment);
commentRouter.delete("/:commentId", decode, deleteComment);

module.exports = commentRouter;
