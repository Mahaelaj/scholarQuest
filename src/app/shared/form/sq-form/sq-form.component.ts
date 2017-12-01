import { Component, ContentChildren, QueryList, AfterContentInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { TextFieldComponent } from '../text-field/text-field.component';
import { SelectFieldComponent } from '../select-field/select-field.component';
import { EmailValidator } from '../email-validator/email.validator';
import { IdenticalValidator } from '../identical-validator/identical.validator';
import { PasswordValidator } from '../password-validator/password.validator';
import { ApiService } from '../../utils/api.service';
import { Toasty } from '../../sq-toasty/sq-toasty.component';
import * as _ from 'lodash';

@Component({
    selector: 'sq-form',
    templateUrl: './sq-form.component.html',
    styleUrls: ['./sq-form.component.css']
})
export class SqFormComponent implements AfterContentInit{

    @Input('title') title: string = '';
    @Input('submit-api') submitApi: string = '';
    @Input('complete-route') completeRoute: string; // where are we going to go after successful form submission
    @Input('scroll') scroll: boolean; // where are we going to go after successful form submission
    
    // if the parent wants to do its own submit processing, this is the event for it - when this is set, we will not submit to the API and refer to the parent instead
	@Output() formSubmitted = new EventEmitter<any>();

    // form field components sent to us from the template
	fields: any[] = [];
    @ContentChildren(TextFieldComponent) textFields: QueryList<TextFieldComponent>;
    @ContentChildren(SelectFieldComponent) selectFields: QueryList<SelectFieldComponent>;
    
    // form builder control group
    form: FormGroup;
    
    constructor(public fb: FormBuilder, public apiService: ApiService, protected router: Router, protected route: ActivatedRoute, public toasty: Toasty) {}
    
    ngAfterContentInit(){

        // get all form fields in a single array
        this.textFields.forEach(field => { this.fields.push(field); });
        this.selectFields.forEach(field => { this.fields.push(field); });

        if (this.scroll != undefined) this.scroll = true;

        // build the form group initialization data
		let group : { [key : string] : string[] } = {};
        this.fields.forEach(field => {

            let fieldValidators = [];
			if (field.required != undefined) fieldValidators.push(Validators.required);
			if (field.validateEmail != undefined) fieldValidators.push(EmailValidator.validate);
			if (field.validatePassword != undefined) fieldValidators.push(PasswordValidator.validator(this, field.validatePassword));
			if (field.validateIdentical != undefined) fieldValidators.push(IdenticalValidator.validator(this, field.validateIdentical));

            // prepare the field control data - we may use default values when applicable
            let fieldControl = [ field.defaultValue || '', fieldValidators ];

            // add the field control to the main control group
			group[field.name] = fieldControl;
        });

        // build the form group main control group
		this.form = this.fb.group(group);
        
        // set the field form component reference
        this.fields.forEach(field => {field.form = this.form; });
    }

    async onSubmit() {
        this.apiService.post(this.submitApi, this.form.value).subscribe(
            data => {
                if (data.status != "Success") {
                    this.toasty.error(data.error);
                    return;
                }
                this.formSubmitted.emit(data);

                // if completion route is given, proceed to the new screen
                if (this.completeRoute) {

                    // get the parameters required coming from router parameter - get it from the configured parameter
                    let params : { [key : string] : string } = {};

                    // now proceed to the completion screen
                    this.router.navigate([ this.completeRoute, params ], { relativeTo: this.route });

                }
            },
            error => { 
                this.toasty.error(error.error);
            }
        )
    }
}