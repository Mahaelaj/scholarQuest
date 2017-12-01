import { Component, Input, ViewChild, Output, EventEmitter, AfterContentInit } from '@angular/core';
import { FormField } from '../form-field/form-field';

/*
 * text input form field component
 */
@Component({
    selector: 'text-field',
    templateUrl: 'text-field.component.html',
    styleUrls: ['./text-field.component.css']
})
export class TextFieldComponent extends FormField implements AfterContentInit{

	// form field properties that denote the view and behavior
	@Input('name') name: string;
	@Input('label') label: string;
	@Input('required') required: boolean;
	@Input('is-password') isPassword: boolean;
	@Input('validate-email') validateEmail: boolean;
	@Input('validate-password') validatePassword: boolean;
	@Input('validate-identical') validateIdentical: boolean;

	// to make the field readonly
	@Input('readonly') readonly: boolean;

	@ViewChild('textInput') textInput;

	public focused = false;

	ngAfterContentInit() {
		if (this.isPassword != undefined) this.isPassword = true;
	}

	showErrorMessage(error){
		if (!this.form || !this.form.controls[this.name] || !this.form.controls[this.name].errors) return false;
		return (this.form.controls[this.name].errors[error] && this.form.controls[this.name].dirty && !this.form.controls[this.name].valid && !this.focused)
	}
}