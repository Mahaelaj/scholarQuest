import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';

import { GamesListComponent } from './games-list/games-list.component';

const routes: Routes = [
	{ path: '', component: GamesListComponent },
	{ path: 'games', component: GamesListComponent },
	{ path: 'math-bingo', loadChildren: './math-bingo/math-bingo.module#MathBingoModule' },
	{ path: 'vocab-match', loadChildren: './vocab-match/vocab-match.module' },
	{ path: 'typing', loadChildren: './typing/typing.module' },
	{ path: 'math-clouds', loadChildren: './math-clouds/math-clouds.module' },
	{ path: 'pipes', loadChildren: './pipes/pipes.module' },	
	{ path: 'apple-drop', loadChildren: './apple-drop/apple-drop.module' },	
];

@NgModule({
	imports: [
		CommonModule,
		MatCardModule,
		FlexLayoutModule,
		RouterModule.forChild(routes),
	],
	declarations: [
		GamesListComponent
	]
})
export class GamesModule {}
