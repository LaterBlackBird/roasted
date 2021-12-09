const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const coffeesRouter = require('./coffees.js')
const checkinRouter = require('./checkins.js')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/coffees', coffeesRouter);
router.use('/checkins', checkinRouter);


router.get('/restore-user', restoreUser,(req, res) => {
    return res.json(req.user);
  }
);


router.get( '/require-auth', requireAuth, (req, res) => {
    return res.json(req.user);
  }
);

module.exports = router;
