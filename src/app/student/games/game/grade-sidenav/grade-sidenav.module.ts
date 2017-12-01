import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule, MatGridListModule, MatButtonModule, MatIconModule } from '@angular/material';

import { GradeSidenavComponent } from './grade-sidenav.component';

@NgModule({
	imports: [
		MatSidenavModule,
		MatGridListModule,
		MatButtonModule,
		CommonModule,
		FlexLayoutModule,
		MatIconModule
	],
	declarations: [
		GradeSidenavComponent
	],
	exports: [
        GradeSidenavComponent
	]
})
export class GradeSidenavModule {}
