import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameModule } from '../game/game.module';

import { PipesComponent } from './pipes.component';

const routes: Routes = [
	{ path: ':type', component: PipesComponent },
	{ path: 'pipes/:type', component: PipesComponent }
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
		PipesComponent
	]
})
export class PipesModule {}
