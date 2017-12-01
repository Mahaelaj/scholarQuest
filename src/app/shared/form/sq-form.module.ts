import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule, MatFormFieldModule, MatButtonModule, MatSelectModule } from '@angular/material';

import { SqFormComponent } from './sq-form/sq-form.component';
import { TextFieldComponent } from './text-field/text-field.component';
import { SelectFieldComponent } from './select-field/select-field.component';
import { EmailValidator } from './email-validator/email.validator';
import { IdenticalValidator } from './identical-validator/identical.validator';
import { PasswordValidator } from './password-validator/password.validator';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatInputModule,
		MatFormFieldModule,
		MatButtonModule,
		MatSelectModule
	],
	declarations: [
		SqFormComponent,
		TextFieldComponent,
		EmailValidator,
        IdenticalValidator,
		PasswordValidator,
		SelectFieldComponent
    ],
    exports: [
		SqFormComponent,
		TextFieldComponent,
		EmailValidator,
		IdenticalValidator,
		PasswordValidator,
		SelectFieldComponent
	],
})
export class SqFormModule {}
