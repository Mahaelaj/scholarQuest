import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule, MatButtonModule, MatSnackBarModule } from '@angular/material';

import { StorePageComponent } from './store-page/store-page.component';
import { StoreItemComponent } from './store-item/store-item.component';

const routes: Routes = [
	{ path: '', component: StorePageComponent },
	{ path: 'store', component: StorePageComponent },
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		FlexLayoutModule,
		MatDialogModule,
		MatButtonModule,
		MatSnackBarModule
	],
	declarations: [
		StorePageComponent,
		StoreItemComponent
	],
})
export class StoreModule {}
