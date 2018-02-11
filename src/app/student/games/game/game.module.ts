import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule, MatIconModule, MatSidenavModule, MatCardModule, MatGridListModule, MatButtonModule, MatSnackBarModule } from '@angular/material';
import { GameComponent } from './game/game.component';
import { GradeSidenavComponent } from './grade-sidenav/grade-sidenav.component';
import { EndGameDialogComponent, WinDialogInnerTextComponent, LoseDialogInnerTextComponent } from './end-game-dialog/end-game-dialog.component';
import { CountdownOuterDialogComponent, CountdownInnerDialogComponent } from './countdown-dialog/countdown-dialog.component';

@NgModule({
	imports: [
		MatDialogModule,
		MatSidenavModule,
		MatCardModule,
		MatGridListModule,
		MatIconModule,
		MatButtonModule,
		MatSnackBarModule,
		CommonModule,
		FlexLayoutModule
	],
	declarations: [
		EndGameDialogComponent,
		WinDialogInnerTextComponent,
		LoseDialogInnerTextComponent,
		GradeSidenavComponent,
		GameComponent,
		CountdownOuterDialogComponent,
		CountdownInnerDialogComponent
	],
	bootstrap: [ EndGameDialogComponent, WinDialogInnerTextComponent, LoseDialogInnerTextComponent, CountdownOuterDialogComponent, CountdownInnerDialogComponent ],
	exports: [ GameComponent, EndGameDialogComponent, GradeSidenavComponent ],
})
export class GameModule {}
