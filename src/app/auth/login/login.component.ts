import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CursorService } from '../../cursor/cursor.service';
import { CursorFollowerService } from '../../cursor-follower/cursor-follower.service';
import { UserService } from '../../shared/user/user.service';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
})
export class LoginComponent {

    constructor(public router: Router, public userService: UserService) {}

    loginFormSubmitted(user) {
        this.userService.logIn(user);
        this.router.navigateByUrl('/profile');
    }
}
