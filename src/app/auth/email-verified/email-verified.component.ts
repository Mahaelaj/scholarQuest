import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../../shared/utils/api.service';
import { UserService } from '../../shared/user/user.service';

@Component({
  templateUrl: 'email-verified.component.html',
  styleUrls: ['email-verified.component.css'],
})
export class EmailVerifiedComponent {

  emailVerified = false;

  constructor(public route: ActivatedRoute, public apiService: ApiService, public userService: UserService){
    this.apiService.post('verifyEmail', {id: this.route.snapshot.params['id']}).subscribe(
    session => {
      this.userService.logIn(session.sessionToken);
      this.emailVerified = true;
      
    },
    error => {
      this.emailVerified = false;
    })
  }
}
