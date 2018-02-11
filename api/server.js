const Koa = require('koa');
const views = require('koa-views');
const body_parser = require('koa-bodyparser');
const serve = require('koa-static');
var path = require('path');
const bunyan_logger = require('bunyan');
const logger = require('koa-bunyan-logger');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const send = require('koa-send');
const utils = require('./common/utils/utils.js');

// initialize the router - this may be accessed from all the modules
const Router = require('koa-router');

var userRoutes = require('./controllers/user/user.js');
var avatarRoutes = require('./controllers/avatar/avatar.js');
const studentRoutes = require('./controllers/student/student.js');

const db = require('./common/db/db.js');

// initialize and export application
const api = new Koa();

// api.use(bodyParser.urlencoded({ extended: false }));

// setup logging for errors
api.use(logger(bunyan_logger.createLogger({ name: 'ScholarQuestLog', streams: [ { type: 'rotating-file', path: './log/api-error.log', level: 'error', period: '1d', count: 7 } ] })));

// view engine setup
api.use(serve(path.join(__dirname, '../dist')));

// create MySQL connection pool with max process limit
api.use(db.connect);

api.use(views(path.join(__dirname, '../views'), { extension: 'html' }));
api.use(async function(ctx, next) {
    if (ctx.path.substr(0, 5).toLowerCase() === '/api/') {
        await next();
        return;
      } else if (await send(ctx, ctx.path, sendOpts)) {
        // file exists and request successfully served so do nothing
        return;
      } else if (ctx.path.indexOf('.') !== -1) {
        // file does not exist so do nothing and koa will return 404 by default
        // we treat any path with a dot '.' in it as a request for a file
        return;
      } else {
        // request is for a subdirectory so treat it as an angular route and serve index.html, letting angular handle the routing properly
        await ctx.render('index');
      }
    // console.log(ctx.request.url);
    // if (ctx.request.url.includes('/api/')) await next();
    // else await 
  });

/**
 * handle thrown or uncaught exceptions
 * @param {Error} err - the error that we caught. this should be an Error object
 * @param {object} ctx - the koa.js context
 */
function handleError(err, ctx) {

    // always return 200 status code - if we handled the request successfully everything's ok - we use the response contents to relay errors
    ctx.status = 200;

    // return error code and message with HTTP status code
    ctx.body = { status: 'Error', error: (err.message || 'Unknown error') };

    // save the error to the application error logs file
    ctx.log.error(err);

    // release the db connection if not already
    ctx.db.release();
}

// await control down the line - the error handler is executed when the control is coming back up
api.use(async function(ctx, next) {
	try {
		await next();
	} catch (err) {
		handleError(err, ctx);
	}
});

// centralized standard error handling that does not go through the standard throw mechanisms - similar handling
api.on('error', (err, ctx) => handleError(err, ctx));

// parse json post request body - keep the limit at 200 mb - for emails, we allow attachments up to 15 mb
// we set limit to 200 mb to be able to sync more customer's data from netsuite
api.use(body_parser({ jsonLimit: '200mb' }));

// check user authentication - session check, super admin level access check
api.use(userRoutes.authenticate);

// this is wrapped in an async function to be able to use await to read the environment for the router
(async function() {

    // setup routes with every controller
    const router = Router({ prefix: '/api' });
    userRoutes.setup_routes(router, api);
    avatarRoutes.setup_routes(router, api);
    studentRoutes.setup_routes(router, api);

    // now register the routes
    api.use(router.routes());

    // handle unknown requests
    api.use(ctx => ctx.throw(`Unknown Request: ${ctx.request.url}`));

    // initialize application
    const port = process.env.PORT || 3000;

    // set the timeout to 1 hour instead of the default 2 minutes. not setting this makes the response hang if it goes past 2 minutes
    api.listen(port).setTimeout(60 * 60 * 1000);

    console.log('listening');
    console.log('Account Portal API Server started');
    console.log(`Environment: ${api.env}`);
    console.log(`Port: ${port}`);

})();

module.exports = api;