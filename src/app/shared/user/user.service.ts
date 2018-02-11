import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response, RequestOptions, Headers } from "@angular/http";

import { CookiesService } from '../cookies/cookies.service'
import { CursorFollowerService } from '../../cursor-follower/cursor-follower.service'
import { CursorService } from '../../cursor/cursor.service';

@Injectable()
export class UserService {

    grade = 0;

    constructor(public cookiesService: CookiesService, public cursorFollowerService: CursorFollowerService, public cursorService: CursorService ) {}

    logIn(user) {
        this.cookiesService.addCookie('sessionToken', user.sessionToken);
        this.cursorService.selectedCursor.next(user.cursorId);
        this.cursorFollowerService.selectedCursorFollower.next(user.cursorFollowerId);
        this.grade = user.grade;
    }

    isLoggedIn() {
        return !!this.cookiesService.getCookie('sessionToken');
    }

    logout() {

        // if we are not logged in, nothing to do - just return ok
        if (!this.isLoggedIn()) return;
        
        this.cursorService.selectedCursor.next(1);
        this.cursorFollowerService.selectedCursorFollower.next(1);
        this.grade = 0;

        // destroy the current session
        this.cookiesService.removeCookie('sessionToken');
    }
}   
