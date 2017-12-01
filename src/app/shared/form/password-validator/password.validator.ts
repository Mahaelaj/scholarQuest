import { Directive } from '@angular/core';
import { FormControl } from '@angular/forms';

import { SqFormComponent } from "../sq-form/sq-form.component";

/*
 * password validator directive
 */
@Directive({
    selector: '[validatePassword][ngControl],[validatePassword][ngModel],[validatePassword][ngFormControl]'
})
export class PasswordValidator {

    /*
     * validation function
     */
    static validator(formComponent: SqFormComponent, identicalInput: string) {

        // returns the function that will do the actual validation
        return function(control: FormControl) {

            if (!formComponent.form || !formComponent.form.controls[identicalInput]) return null;
            formComponent.form.controls[identicalInput].setValue('');
            formComponent.form.controls[identicalInput].markAsUntouched();
            
            // empty value is valid - just because we're doing email validation does not mean it's required
            if (!control.value) return null;

            // password has to be at least 8 characters long
            if (control.value.length < 6) return { weak: true };


            // seems to be a valid password - return null
            return null;
        };
    }
}
