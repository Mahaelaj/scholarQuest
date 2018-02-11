import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';

import { VocabMatchComponent } from './vocab-match.component';
import { GameModule } from '../game/game.module';

const routes: Routes = [
	{ path: '', component: VocabMatchComponent },
	{ path: 'vocab-match', component: VocabMatchComponent }
];

@NgModule({
	imports: [
		CommonModule,
		FlexLayoutModule,
		GameModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		VocabMatchComponent,
	]
})
export class VocabMatchModule {}
