/*
 * Avatar related request handlers
 */
'use strict';
const _ = require('lodash');

const Controller = require('../../common/controller/controller.js');

/*
 * client object to house functions for user related functions
 */
class Avatar extends Controller {

	/*
	 * handled routes
	 */
    routes() {
		return [
			{ path: '/getAvatar', handler: this.getAvatar },
			{ path: '/updateAvatar', handler: this.updateAvatar },
			{ path: '/getAvatarSkinColor', handler: this.getAvatarSkinColor }
		];
    }
    
    /**
	 * Returns the customers search texts
	 */
	async getAvatar() {
		const avatar = await this.db.select_row(`
			SELECT * from avatars 
			WHERE userId = ? 
		`, [ this.userInfo.userId ])
        this.body = { status: 'Success', avatar }
    }

    /**
	 * Returns the customers search texts
	 */
	async updateAvatar() {
		let avatar = _.omit(this.params, ['sessionToken']);
		avatar.userId = this.userInfo.userId;
		await this.db.update('avatars', avatar, 'userId');
        this.body = { status: 'Success' }
    }

    /**
	 * Returns the customers search texts
	 */
	async getAvatarSkinColor() {
		await this.db.select_val('select skin_id from avatars where userId=?', this.userInfo.userId);
        this.body = { status: 'Success' }
    }
}

// exported module functions
module.exports = new Avatar();