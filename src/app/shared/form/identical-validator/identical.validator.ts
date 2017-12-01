import { Directive } from '@angular/core';
import { FormControl } from "@angular/forms";

import { SqFormComponent } from "../sq-form/sq-form.component";

/*
 * identical validator directive - used for password confirmation - if a field is identical to another field, it becomes valid
 */
@Directive({
	selector: '[validateIdentical][ngControl],[validateIdentical][ngModel],[validateIdentical][ngFormControl]'
})
export class IdenticalValidator {

	/*
	 * validation generating function based on the identical inputs
	 */
	static validator(formComponent: SqFormComponent, identicalInput: string) {

		// returns the function that will do the actual validation
		return function(control: FormControl) {

			if (!formComponent.form || !control.value) return;
			// console.log(control.value);
			// console.log(formComponent.form.controls[identicalInput].value);
			// if the value of the control we have is not identical to the control that should be the same, return different
			if (formComponent.form && control.value && formComponent.form.controls[identicalInput].value && control.value != formComponent.form.controls[identicalInput].value) {
				return { different: true };
			}

			// inputs seem to be identical - return null
			return null;
		};
	}
}
