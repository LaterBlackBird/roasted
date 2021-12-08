const express = require('express');
const asyncHandler = require('express-async-handler');
// const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Coffee, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateCoffee = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a valid coffee name.')
        .isLength({ min: 6 })
        .withMessage('Name must be at least 6 characters.')
        .isLength({ max: 30 })
        .withMessage('Name cannot be more than 30 characters.'),
    check('description')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Please provide a description.'),
    handleValidationErrors
];

// Get all coffees
router.get('/', asyncHandler(async (req, res) => {
    const allCoffees = await Coffee.findAll({
        include: User
    });
    return res.json({ allCoffees });
}));

// Get a single coffee
router.get('/:id', asyncHandler(async (req, res) => {
    const coffeeId = req.params.id;
    const coffee = await Coffee.findByPk(coffeeId);
    const data = res.json(coffee.name);
    if (!coffee) {
        console.log(data.name)
    } else {
        console.log('no coffee found')
    }
}));

// Create a coffee
router.post('/', validateCoffee, asyncHandler(async (req, res) => {
    console.log(req.body.name)
    const { userId, name, description, imageUrl } = req.body;
    const newCoffee = await Coffee.create({
        userId,
        name,
        description,
        imageUrl,
    });
    res.json({ newCoffee });
}));

// Update a coffee
router.patch('/:id', validateCoffee, asyncHandler(async (req, res) => {
    const coffeeId = req.params.id
    const { name, description, imageUrl } = req.body;
    const coffeeToUpdate = await Coffee.findByPk(coffeeId);

    await coffeeToUpdate.update({
        name,
        description,
        imageUrl,
    });
    return res.json(coffeeToUpdate);
}));


// Delete a single coffee
router.delete('/:id', asyncHandler(async (req, res) => {
    const coffeeId = req.params.id;
    const coffeeToDelete = await Coffee.findByPk(coffeeId);
    coffeeToDelete.destroy();
    res.json({ message: "Coffee Deleted" });

}));


module.exports = router;
