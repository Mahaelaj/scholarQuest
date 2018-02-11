import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameModule } from '../game/game.module';

import { WordSmithComponent } from './word-smith.component';

const routes: Routes = [
	{ path: '', component: WordSmithComponent },
	{ path: 'word-smith', component: WordSmithComponent }
];

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		FlexLayoutModule,
		RouterModule.forChild(routes),
		GameModule
	],
	declarations: [
		WordSmithComponent
	]
})
export class WordSmithModule {}
