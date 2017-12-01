import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material';

import { MathBingoComponent } from './math-bingo.component';
import { GameModule } from '../game/game.module';

const routes: Routes = [
	{ path: '', component: MathBingoComponent },
	{ path: 'math-bingo', component: MathBingoComponent }
];

@NgModule({
	imports: [
		MatCardModule,
		CommonModule,
		FlexLayoutModule,
		GameModule,
		RouterModule.forChild(routes),
	],
	declarations: [
		MathBingoComponent
	]
})
export class MathBingoModule {}
