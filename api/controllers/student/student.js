/*
 * Avatar related request handlers
 */
'use strict';

const _ = require('lodash');

const Controller = require('../../common/controller/controller.js');

/*
 * client object to house functions for user related functions
 */
class Student extends Controller {

	/*
	 * handled routes
	 */
    routes() {
		return [
			{ path: '/getVocabulary', handler: this.getVocabulary },
			{ path: '/getMath', handler: this.getMath },
			{ path: '/getStudent', handler: this.getStudent },
			{ path: '/updateCursor', handler: this.updateCursor },
			{ path: '/updateCursorFollower', handler: this.updateCursorFollower },
			{ path: '/updateCoins', handler: this.updateCoins }
		];
    }
    
    /**
	 * Returns the customers search texts
	 */
	async getVocabulary() {
		const vocab = await this.db.select_all('SELECT * FROM vocabulary_problems WHERE grade = ?', [ this.params.grade ]);
		this.body = { status: 'Success', vocab: vocab };
    }

    /**
	 * Returns the customers search texts
	 */
	async getMath() {
        const math = await this.db.select_all('SELECT * FROM math_problems WHERE grade = ?', [ this.params.grade ]);
        this.body = { status: 'Success', math: math };
    }

    /**
	 * Returns the customers search texts
	 */
	async getStudent() {
		const user = await this.db.select_row('SELECT cursorId, cursorFollowerId, coins FROM users WHERE userId = ?', [ this.userInfo.userId ]);
		this.body = _.merge({ status: 'Success' }, user );
    }

	async updateCursor() {
		this.db.update('users', { cursorId: this.params.cursorId, userId: this.userInfo.userId }, 'userId');
        this.body = { status: 'Success' };
	}

	async updateCursorFollower() {
		this.db.update('users', { cursorFollowerId: this.params.cursorFollowerId, userId: this.userInfo.userId }, 'userId');
        this.body = { status: 'Success' };
	}

	async updateCoins() {
		const oldCoins = await this.db.select_val('SELECT coins FROM users WHERE userId = ?', [this.userInfo.userId]);
		let newCoins = oldCoins + this.params.coins;
		if (newCoins < 0) newCoins = 0;
		await this.db.update('users', { coins: newCoins, userId: this.userInfo.userId }, 'userId');
        this.body = { status: 'Success', coins: newCoins };
	}
}

// exported module functions
module.exports = new Student();