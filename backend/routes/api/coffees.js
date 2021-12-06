const express = require('express');
const asyncHandler = require('express-async-handler');
// const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Coffee } = require('../../db/models');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// const validateCoffee = [
//     check('email')
//         .exists({ checkFalsy: true })
//         .isEmail()
//         .withMessage('Please provide a valid email.'),
//     check('username')
//         .exists({ checkFalsy: true })
//         .isLength({ min: 4 })
//         .withMessage('Please provide a username with at least 4 characters.'),
//     check('username')
//         .not()
//         .isEmail()
//         .withMessage('Username cannot be an email.'),
//     check('password')
//         .exists({ checkFalsy: true })
//         .isLength({ min: 6 })
//         .withMessage('Password must be 6 characters or more.'),
//     handleValidationErrors
// ];

// Get all coffees
router.get('/', asyncHandler(async (req, res) => {
    const allCoffees = await Coffee.findAll();
    return res.json({allCoffees});
}));

// Get a single coffee
router.get('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const coffee = await Coffee.findByPk(id);
    return res.json({ coffee });
}));

module.exports = router;
