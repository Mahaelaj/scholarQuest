import { Component, Injectable } from '@angular/core';
import { EyesComponent } from './eyes/eyes.component';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CursorFollowerService {
    public cursorFollower0: { img: string, index: number } = { img: '../assets/clip-art/None.png', index: 1 };
    public cursorFollower1: { img: string, index: number } = { img: '../assets/cursor-followers/EyesFollower.jpg', index: 2 };
   
    public cursorFollowers: { img: string, index: number }[] = [];
    public selectedCursorFollower = new BehaviorSubject(1);

    constructor() {
        //add the cursor followers to an array        
        this.cursorFollowers.push(this.cursorFollower0);
        this.cursorFollowers.push(this.cursorFollower1);
    }

    /*
     * return the cursor Followers
     */
    getCursorFollowers(): { img: string, index: number }[] {
        return this.cursorFollowers;
    }
}
