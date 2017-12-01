const _ = require('lodash');

/*
 * base controller - contains common routines and business logic
 */
class Controller {

    /*
	 * setup routes
	 */
	setup_routes(router, api) {

        // setup reference to the object in koa and vice versa
        let object = this;
        let object_name = this.constructor.name.toLowerCase();
        api.use(async function(ctx, next) {

            // create new object for the request
            let handler_object = _.cloneDeep(object);

            // set reference to koa in this object and various useful objects in koa
            handler_object.koa = ctx;

            // set reference to this object in koa
            ctx[object_name] = handler_object;

            // follow on to the next route
            await next();
        });

        // setup the routes for the object
        for (let route of this.routes()) {
            const method = (_.get(route, 'method') || 'POST').toLowerCase();
            router[method](route.path, async ctx => await ctx[object_name][route.handler.name](ctx));
        }
    }

    /*
	 * body setter - pass it on to the koa object body setter
	 */
	set body(response) {
		this.koa.body = response;
    }

	/*
	 * refers to the koa request object
	 */
	get request() {
		return this.koa.request;
	}

	/*
	 * mysql reference
	 */
	get db() {
		if (this.koa) return this.koa.db;
    }
    
    get params() {
    	if (this.koa) return this.request.body;
    }
    
    param(field) {
		return this.request.body[field];
    }
    
    throw(err) {
		this.koa.throw(err);
    }
    
    /*
	 * returns the current user information
	 */
	get userInfo() {
		return this.koa.userInfo;
	}

	/*
	 * sets the current user information
	 */
	set userInfo(user) {
		this.koa.userInfo = user;
	}

}

// export controller class
module.exports = Controller;