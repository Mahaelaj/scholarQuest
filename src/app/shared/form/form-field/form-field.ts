import {FormGroup} from "@angular/forms";
import { Input } from '@angular/core';

declare var Promise: any;
/*
 * form field base class
 */
export class FormField {

	// common data for form fields - they are to be used as input in children
	@Input('name') name: string;
	@Input('label') label: string;
	@Input('required') required: boolean;
	@Input('default-value') defaultValue: any;

	// determine if this is going to be full-line block (default) or inline-block
	@Input('inline') inline: boolean;

	// reference to the hosting form for controls - initialized by the parent form
	form: FormGroup;

	/*
	 * returns the value promises upon form submission - return the value from the control by default
	 * the reason we do not return the value directly without a promise is because it may include reading files when it's a file input (or other type of input that would require async operation)
	 */
	getValuePromise() {
		return new Promise((resolve: any, reject: any) => { resolve({ field_name: this.name, field_value: this.form.value[this.name] }) });
	}

	/*
	 * this call is used when the value changes after a certain period of time, usually from the API - sometimes due to the components used the form value updates may not take effect in the UI (or may be partial)
	 * this is a work around for those cases - there is probably a better way of handling this but for now it works - this logic is to be implemented by the child when necessary
	 */
	setValue(value: string) { }
}
