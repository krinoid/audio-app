const path = require('path');
const contentDisposition = require('content-disposition');
const express = require('express');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');

const {
  developmentErrors,
  productionErrors,
  notFoundError,
} = require('./errorHandlers');
const apiRouter = require('./router');

// injects database (knex) object as a request property
// for easier access to db from within controllers
const dbMiddleware = db => {
  return (req, res, next) => {
    req.db = db;
    next();
  };
};

// set header to force download
function setDownloadsHeaders(res, contentPath) {
  res.setHeader('Content-Disposition', contentDisposition(contentPath));
}

function startServer({ port, prefix, db }) {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // static files serving config
  app.use(
    serveStatic(path.join(__dirname, '../public/songs'), {
      index: false,
      setHeaders: setDownloadsHeaders,
    })
  );

  app.use(dbMiddleware(db));
  app.use(prefix, apiRouter);

  app.use(notFoundError);
  if (app.get('env') === 'development') {
    // development error handler - prints stack trace
    app.use(developmentErrors);
  }
  // production error handler, sanitizes error details
  app.use(productionErrors);

  app.listen(
    port,
    () => console.log(`Server started on http://localhost:${port}`) // eslint-disable-line no-console
  );

  return app;
}

module.exports = startServer;
