/*
 * Store related request handlers
 */
'use strict';

const _ = require('lodash');

const Controller = require('../../common/controller/controller.js');

/*
 * client object to house functions for user related functions
 */
class Store extends Controller {

	/*
	 * handled routes
	 */
    routes() {
		return [
			{ path: '/getProducts', handler: this.getProducts },
			{ path: '/buyProduct', handler: this.buyProduct }
		];
    }
    
    /**
	 * Returns the products that can be viewed in the store.
     * Don't include products the user has already bought
	 */
	async getProducts() {
        let products;
        if (this.userInfo) products = await this.db.select_all('SELECT * FROM products WHERE product_id NOT IN (SELECT product_id FROM user_products WHERE user_id = ?)', [ this.userInfo.userId ]);
        else products = await this.db.select_all('SELECT * FROM products');
		this.body = { status: 'Success', products: products };
    }

    async buyProduct() {
        let errorMessage = '';
        const userCoins = await this.db.select_val('SELECT coins FROM users WHERE userId = ?', [ this.userInfo.userId ]);
        const productPrice = await this.db.select_val('SELECT price from products WHERE product_id = ?', [ this.params.product_id ]);
        if (productPrice > userCoins) return this.body = { status: 'Error', error_message: 'You do not have enough coins to purchase this item' };
        if (await this.db.select_val('SELECT COUNT(*) from user_products WHERE product_id = ? AND user_id = ?', [ this.params.product_id, this.userInfo.userId ])) return this.body = { status: 'Error', error_message: 'You have already purchased this item' };
        await this.db.insert('user_products', { product_id: this.params.product_id, user_id: this.userInfo.userId });
        await this.db.update('users', { coins: userCoins - productPrice, userId: this.userInfo.userId }, 'userId')
		this.body = { status: 'Success' };
    }
}

// exported module functions
module.exports = new Store();