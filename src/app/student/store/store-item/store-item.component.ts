import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'store-item',
    templateUrl: './store-item.component.html',
    styleUrls: ['./store-item.component.css'],
})
export class StoreItemComponent implements OnInit {
    @Input() item;
    storeItemPath='';

    ngOnInit() {
        this.storeItemPath = '../../assets/avatars/shirts/store/' + this.item.name + '.png'; 
    }
}
