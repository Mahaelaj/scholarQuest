import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameModule } from '../game/game.module';

import { AppleDropComponent } from './apple-drop.component';


const routes: Routes = [
	{ path: '', component: AppleDropComponent },
	{ path: 'apple-drop', component: AppleDropComponent }
];

@NgModule({
	imports: [
		CommonModule,
		MatCardModule,
		FlexLayoutModule,
		RouterModule.forChild(routes),
		GameModule
	],
	declarations: [
		AppleDropComponent
	]
})
export default class AppleDropModule {}
