import {Directive} from '@angular/core';
import {FormControl} from '@angular/forms';

/*
 * email validator directive
 */
@Directive({
    selector: '[validateEmail][ngControl],[validateEmail][ngModel],[validateEmail][ngFormControl]'
})
export class EmailValidator {

    /*
     * validation function
     */
    static validate(c: FormControl) {

        // empty value is valid - just because we're doing email validation does not mean it's required
        if (!c.value) return null;

        // email validation regular expression
        let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

        // split the control value by commas and check every email - if any one of them does not match, error out
        for (let email of c.value.split(',')) if (!EMAIL_REGEXP.test(email.trim())) return { invalid: true };

        // seems to be valid email - return null
        return null;
    }
}
