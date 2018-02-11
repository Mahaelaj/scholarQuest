import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule, MatInputModule, MatButtonModule } from '@angular/material';

import { WelcomeEmailSentComponent } from './welcome-email-sent/welcome-email-sent.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { EmailVerifiedComponent } from './email-verified/email-verified.component';
import { SqFormModule } from '../shared/form/sq-form.module';

const routes: Routes = [
	{ path: '', component: SignupComponent },
	{ path: 'signup', component: SignupComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'welcome', component: WelcomeEmailSentComponent },
	{ path: 'verified/:id', component: EmailVerifiedComponent }
];

@NgModule({
	imports: [
		MatCardModule,
		MatInputModule,
		CommonModule,
		FlexLayoutModule,
		RouterModule.forChild(routes),
		FormsModule,
		ReactiveFormsModule,
		SqFormModule,
		MatButtonModule
	],
	declarations: [
		SignupComponent,
		LoginComponent,
		WelcomeEmailSentComponent,
		EmailVerifiedComponent
	]
})
export class AuthModule {}
