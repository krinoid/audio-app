const express = require('express');
const paginate = require('express-paginate');

const { getSongs, getSong } = require('../song/controllers');
const { catchErrors } = require('./errorHandlers');

const router = express.Router();

// page limit: [10, 100]
const paginateMiddleware = paginate.middleware(10, 100);
// enforce, that lowest limit is 10
const limitPaginationMiddleware = (req, res, next) => {
  if (req.query.limit <= 10) req.query.limit = 10;
  next();
};

// API offers "expand" parameter for expanding objects
// for easier processing, we cast "expand" query param to bool
const expandMiddleware = (req, res, next) => {
  req.query.expand = req.query.expand === 'true';
  next();
};

const paginationMiddlewares = [paginateMiddleware, limitPaginationMiddleware];

router.use(expandMiddleware);
router.get('/songs', paginationMiddlewares, catchErrors(getSongs));
router.get('/songs/:id', catchErrors(getSong));

module.exports = router;
