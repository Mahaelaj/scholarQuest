import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { CursorService } from '../cursor/cursor.service';
import { CursorFollowerService } from '../cursor-follower/cursor-follower.service';
import { CoinsService } from '../shared/utils/coins.service';
import { UserService } from '../shared/user/user.service';

@Component({
  selector: 'sq-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewInit{
    private silverCoins = 0;
    private goldCoins = 0;
    
    constructor(public router: Router, public userService: UserService, public coinsService: CoinsService, public cursorService: CursorService, public cursorFollowerService: CursorFollowerService) {}

    ngAfterViewInit(){
        this.coinsService.coins.subscribe(coins => {
            this.silverCoins = coins%100;
            this.goldCoins = Math.floor(coins/100);
        })
    }

    logout() {
        this.userService.logout();
        this.router.navigateByUrl('/home');
    }
}
