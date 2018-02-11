import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';

import { TypingComponent } from './typing.component';
import { GameModule } from '../game/game.module';

const routes: Routes = [
	{ path: '', component: TypingComponent },
	{ path: 'typing', component: TypingComponent }
];

@NgModule({
	imports: [
		CommonModule,
		MatIconModule,
		FlexLayoutModule,
		GameModule,
		RouterModule.forChild(routes),
	],
	declarations: [
		TypingComponent
	]
})
export class TypingModule {}
