import { Component } from '@angular/core';

@Component({
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']

})
export class SignupComponent {
    gradeOptions=[ { value: '1st', key: 1 },{value: '2nd', key: 2},{value: '3rd', key: 3},{value: '4th', key: 4},{value: '5th', key: 5},{value: '6th', key: 6}]
}

