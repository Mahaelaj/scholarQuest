import { Injectable }  from '@angular/core';
import { ToastyConfig, ToastOptions, ToastData, ToastyService } from 'ng2-toasty';

declare var window: any;

@Injectable()
export class Toasty {

	// we use it to set the options how to display the messages
	toastOptions: ToastOptions;

	constructor(public toastyConfig: ToastyConfig, public toastyService: ToastyService) {
		this.toastyConfig.theme = 'default';
	}

	/*
	 * set the options here - the theme ( bootstrap or material) - title and message are required
	 */
	setToastConf(title: string, message: string) {
		return this.toastOptions = {
			title: title,
			msg: message,
			showClose: true,
			timeout: 5000,
			theme: 'default',
			onAdd: (toast: ToastData) => {},
			onRemove: function (toast: ToastData) {}
		}
	}

	error(message: string) {
		this.toastyService.error(this.setToastConf('Error', message));
	}
}
