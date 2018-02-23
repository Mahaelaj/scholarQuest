import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { ApiService } from '../../../shared/utils/api.service';
import { UserService } from '../../../shared/user/user.service';

@Component({
    templateUrl: './store-page.component.html',
    styleUrls: ['./store-page.component.css'],
})
export class StorePageComponent {

    products = [];
    noProducts = false;
    productRows = [];
    dialogProductItem;
    dialogProductPrice;
    dialogProductId;
    dialogRef;

    @ViewChild('confirmationDialog') confirmationDialog;
    
    constructor(public apiService: ApiService, public dialog: MatDialog, public snackBar: MatSnackBar, public user: UserService) {
        this.apiService.post('getProducts', {}).subscribe(
            data => {
                if (!data.status || !data.products.length) { 
                    this.noProducts = true;
                    return;
                }
                this.products = data.products;
                if (this.products.length) {
                    this.productRows = Array(Math.ceil((this.products.length)/ 3));
                }
            },
            error => {
                this.noProducts = true;
            }
        );
    }

    openConfirmationDialog(product) {
        this.dialogProductItem = '../../assets/avatars/shirts/store/' + product.name + '.png';
        this.dialogProductPrice = product.price;
        this.dialogProductId = product.product_id;
        this.dialogRef = this.dialog.open(this.confirmationDialog);
    }

    buy() {
        if (!this.user.isLoggedIn()) {
            this.snackBar.open('You must be logged in to buy this item', 'close');
            return;
        }
        this.apiService.post('buyProduct', { product_id: this.dialogProductId }).subscribe(
            data => {
                if (data.status == 'Error') { 
                    this.snackBar.open(data.error_message, 'close');
                    return;
                }
                this.dialogRef.close();
            },
            error => {
                this.snackBar.open('An unknown error has occured', 'close');
            }
        );
    }

    cancel() {
        this.dialogRef.close();
    }
}
