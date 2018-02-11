/*
 * Avatar related request handlers
 */
'use strict';

var bycrypt = require('bcryptjs');
var _ = require('lodash');
var nodemailer = require('nodemailer');
var Cryptr = require('cryptr');
var jwt = require('jsonwebtoken');

const Controller = require('../../common/controller/controller.js');

/*
 * client object to house functions for user related functions
 */
class User extends Controller {

	/*
	 * handled routes
	 */
    routes() {
		return [
			{ path: '/signup', handler: this.signup },
			{ path: '/login', handler: this.login },
			{ path: '/verifyEmail', handler: this.verifyEmail },
		];
    }
    
    /**
	 * Returns the customers search texts
	 */
	async signup() {

		const user_exists = await this.db.select_val('select 1 from users where email = ?', [ this.params.email ]);
		if (user_exists) this.throw(`A user with email ${this.params.email} already exists.`);

		this.params.password = bycrypt.hashSync(this.params.password, 10);
		delete this.params.confirmPassword;
		await this.db.insert('users', this.params);
		await this.sendWelcomeEmail();
		this.body = { status: 'Success' };
	}
	
	async sendWelcomeEmail(){
		try {
			let transporter = nodemailer.createTransport({
				service: 'gmail',
				secure: false,
				port: 25,
				auth: {
					user: 'schquest@gmail.com',
					pass: 'Pewpew12!!'
				},
				tls: {
					rejectUnauthorized: false
				}
			});
		
			let HelperOptions = {
				from: 'schquest@gmail.com',
				to: this.params.email,
				subject: 'Welcome to ScholarQuest',
				text: 'Thank you for creating a ScholarQuest account! Follow this link to verify your account: https://scholarquest.herokuapp.com/auth/verified/' + this.getCryptr().encrypt(this.params.email)
			};

			transporter.sendMail(HelperOptions, (error, info) => {
				if(error) {
					console.log(error);
				}
				else console.log("email sent");
			})
		} catch (e) {

			// email delivery failed
			console.log('Email Error: ', e);
		}
	}

    /**
	 * Returns the customers search texts
	 */
	async login() {
		const user = await this.db.select_row(`select userId, cursorId, cursorFollowerId, grade, password, coins from users where email=?`, [ this.params.email ]);

		if (!user || !bycrypt.compareSync(this.params.password, user.password)) this.throw('Invalid Username or Password');
		delete user.password;
		
		const sessionToken = this.getSessionToken(user)
		await this.db.upsert('sessions', { userId: user.userId, sessionToken: sessionToken });
		
		this.body = _.merge(user, { status: 'Success', sessionToken: sessionToken });;
	}
	
	getSessionToken(user) {
		return jwt.sign({ user: user }, 'gamez', { expiresIn: 7200 });
	}

    /**
	 * Returns the customers search texts
	 */
	async verifyEmail() {

		const user = await this.db.select_row(`select * from users where email=?`, [ this.getCryptr().decrypt(this.params.id) ]);
		
		if (!user) this.throw('Email verification issue');
		await this.db.update('users', { userId: user.userId, accountVerified: 1 }, 'userId')
		this.body = { status: 'Success', sessionToken: this.getSessionToken(user) };

		await this.db.insert('avatars', { userId: user.userId });
		
	}
	
	getCryptr() {
		return new Cryptr('winkwink');
	}

	async authenticate(ctx, next) {
		// login, forgot password and reset password do not require authentication
		if ((ctx.path.includes('/api/login') || ctx.path.includes('/api/signup') || ctx.path.includes('/api/getMath') || ctx.path.includes('/api/getVocabulary') || ctx.path.includes('/api/getVocabulary'))) { await next(); return; }

		if (!ctx.request.body.sessionToken) ctx.throw('Session required');
		// check if we have a matching non-expired session record - save it in the koa object - this is mainly for the server side checks - not directly to be used by the client side
		ctx.userInfo = await ctx.db.select_row(`
			SELECT u.*
			FROM users u
			JOIN sessions s ON s.userId = u.userId
			WHERE s.sessionToken = ?
		`, [ ctx.request.body.sessionToken ]);

		// if session does not exist, error out
		if (!ctx.userInfo) ctx.throw('Session invalid');
		await next();
	}
}

// exported module functions
module.exports = new User();