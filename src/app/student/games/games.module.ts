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
	{ path: 'vocab-match', loadChildren: './vocab-match/vocab-match.module#VocabMatchModule' },
	{ path: 'typing', loadChildren: './typing/typing.module#TypingModule' },
	{ path: 'math-clouds', loadChildren: './math-clouds/math-clouds.module#MathCloudsModule' },
	{ path: 'pipes', loadChildren: './pipes/pipes.module#PipesModule' },	
	{ path: 'apple-drop', loadChildren: './apple-drop/apple-drop.module#AppleDropModule' },
	{ path: 'word-smith', loadChildren: './word-smith/word-smith.module#WordSmithModule' },
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
