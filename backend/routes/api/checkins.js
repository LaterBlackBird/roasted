const express = require('express');
const asyncHandler = require('express-async-handler');
const { Checkin, Coffee, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateCoffee = [
    check('location')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a location'),
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
router.post('/', validateCoffee, asyncHandler(async (req, res) => {
    const { userId, name, description, imageUrl } = req.body;
    const newCoffee = await Coffee.create({
        userId,
        name,
        description,
        imageUrl,
    });
    const data = await Coffee.findByPk(newCoffee.id, {
        include: User
    });
    return res.json(data);
}));



module.exports = router;
