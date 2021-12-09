const express = require('express');
const asyncHandler = require('express-async-handler');
const { Checkin, Coffee, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateCheckin = [
    check('location')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a location')
        .isLength({ min: 6 })
        .withMessage('Location must be at least 6 characters.')
        .isLength({ max: 60 })
        .withMessage('Location cannot be more than 60 characters.'),
    handleValidationErrors
];

// Get all check-ins
router.get('/', asyncHandler(async (req, res) => {
    const allCheckins = await Checkin.findAll({
        include: [User, Coffee]
    });
    return res.json(allCheckins);
}));

// Create a check-in
router.post('/', validateCheckin, asyncHandler(async (req, res) => {
    const { userId, drinkId, location } = req.body;
    const newCheckin = await Checkin.create({
        userId,
        drinkId,
        location,
    });
    const data = await Checkin.findByPk(newCheckin.id, {
        include: [User, Coffee]
    });
    return res.json(data);
}));



module.exports = router;
