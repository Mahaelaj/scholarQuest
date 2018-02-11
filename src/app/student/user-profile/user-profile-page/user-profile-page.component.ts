import { Component, Renderer } from '@angular/core';

import { CursorService } from '../../../cursor/cursor.service';
import { CursorFollowerService } from '../../../cursor-follower/cursor-follower.service';
import { ApiService } from '../../../shared/utils/api.service';

@Component({
    templateUrl: './user-profile-page.component.html',
    styleUrls: ['./user-profile-page.component.css'],
})
export class UserProfilePageComponent {
    studentData = { cursorId: 1, cursorFollowerId: 1 };


    ngAfterViewInit(){
        this.apiService.post('getStudent', {}).subscribe(
            student => {
                if (student.status != 'Success') return;
                this.studentData = student;
            }
        )
    }   
    constructor(public cursorService: CursorService, public cursorFollowerService: CursorFollowerService, public apiService: ApiService, public renderer: Renderer) {}

    changeCursor(event) {
        this.apiService.post('updateCursor', {'cursorId': event.normIndex}).subscribe()
        this.cursorService.selectedCursor.next(event.normIndex);
    }

    changeCursorFollower(event) {
        this.apiService.post('updateCursorFollower', {'cursorFollowerId': event.normIndex }).subscribe(
            data =>{console.log(data)},
            error =>{console.log(error)} 
        )
        this.cursorFollowerService.selectedCursorFollower.next(event.normIndex);
    }
}
