const express = require('express');
const asyncHandler = require('express-async-handler');
const { Comment, Checkin, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateComment = [
    check('comment')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a comment.')
        .isLength({ min: 3 })
        .withMessage('You can do better than that, 3 characters min.'),
    handleValidationErrors
];

// Get all comments
router.get('/', asyncHandler(async (req, res) => {
    const allComments = await Comment.findAll({
        include: [User, Checkin]
    });
    return res.json({ allComments });
}));

// Get a single comment
router.get('/:id', asyncHandler(async (req, res) => {
    const commentId = req.params.id;
    const comment = await Comment.findByPk(commentId, {
        include: [User, Checkin]
    });
    return res.json(comment);

}));

// Create a comment
router.post('/', validateComment, asyncHandler(async (req, res) => {
    const { userId, checkinId, comment } = req.body;
    const newComment = await Comment.create({
        userId,
        checkinId,
        comment,
    });
    const data = await Comment.findByPk(newComment.id, {
        include: [User, Checkin]
    });
    return res.json(data);
}));

// Update a comment
router.put('/:id', validateComment, asyncHandler(async (req, res) => {
    const commentId = req.params.id
    const { userId, checkinId, comment } = req.body;
    const commentToUpdate = await Comment.findByPk(commentId, {
        include: [User, Checkin]
    });

    await commentToUpdate.update({
        userId,
        checkinId,
        comment,
    });
    return res.json(commentToUpdate);
}));


// Delete a single comment
router.delete('/:id', asyncHandler(async (req, res) => {
    const commentId = req.params.id;
    const commentToDelete = await Comment.findByPk(commentId);
    commentToDelete.destroy();
    res.json({ message: "Comment Deleted" });

}));


module.exports = router;
