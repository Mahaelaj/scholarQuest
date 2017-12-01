import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MathCloudsComponent } from './math-clouds.component';

const routes: Routes = [
	{ path: '', component: MathCloudsComponent },
	{ path: 'math-clouds', component: MathCloudsComponent }
];

@NgModule({
	imports: [
		CommonModule,
		MatIconModule,
		FlexLayoutModule,
		RouterModule.forChild(routes),
	],
	declarations: [
		MathCloudsComponent
	]
})
export default class MathCloudsModule {}
