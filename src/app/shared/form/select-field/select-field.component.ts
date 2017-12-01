import { Component, Input } from '@angular/core';
import { FormField } from '../form-field/form-field';

/*
 * select field component
 */
@Component({
    selector: 'select-field',
    templateUrl: 'select-field.component.html',
	styleUrls: ['./select-field.component.css']
})
export class SelectFieldComponent extends FormField {

	// form field properties that denote the view and behavior
	@Input('name') name: string;
	@Input('required') required: boolean;
	@Input('options') options: any[];
	@Input('placeholder') placeholder: string = '';
}