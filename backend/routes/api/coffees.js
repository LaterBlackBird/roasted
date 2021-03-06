const express = require('express');
const asyncHandler = require('express-async-handler');
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
        .withMessage('Please provide a description.')
        .isLength({ min: 6 })
        .withMessage('Please provide a description longer than 6 characters.'),
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
    const coffee = await Coffee.findByPk(coffeeId, {
        include: User
    });
    return res.json(coffee);

}));

// Create a coffee
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

// Update a coffee
router.put('/:id', validateCoffee, asyncHandler(async (req, res) => {
    const coffeeId = req.params.id
    const { name, description, imageUrl } = req.body;
    const coffeeToUpdate = await Coffee.findByPk(coffeeId, {
        include: User
    });

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
