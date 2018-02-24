import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response, RequestOptions, Headers } from "@angular/http";

import { CookiesService } from '../cookies/cookies.service';
import { CoinsService } from './coins.service';

@Injectable()
export class ApiService {

    constructor(public http: Http, public cookieService: CookiesService, public coinsService: CoinsService) {}

    /*
     * patch request
     */ 
    patch(path: string, params: any) {
        var token = this.cookieService.getCookie('token');
        if(token) params['token'] = token;
        return this.http.patch('api/' + path, params)
          .map((response: Response) => response.json())
          .catch((error: Response) => Observable.throw(error.json()));
    }

    /*
     * post request
     */ 
    post(path: string, params: any) {
        var sessionToken = this.cookieService.getCookie('sessionToken');
        let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

        if (sessionToken) params.sessionToken = sessionToken;

		// always do post calls - no need to differentiate between get/post/put/patch, etc.
		// the caller model should subscribe to this observable and handle errors
        let resp: Observable<Response> = this.http.post('api/' + path, JSON.stringify(params), options);
          return resp.map((response: Response) => response.json())
          .catch((error: Response) => Observable.throw(error));
    }

    /*
     * add to the users score
     */ 
    addCoins(coins: number){

        this.post('getStudent', {'token': this.cookieService.getCookie('token')}).subscribe(response => { 
            this.coinsService.coins.next(response.coins + coins);
            this.patch('student/patchStudent', {'token': this.cookieService.getCookie('token'), 'coins' : response.coins + coins}).subscribe(r => { 
            });
        })
    }
}   
